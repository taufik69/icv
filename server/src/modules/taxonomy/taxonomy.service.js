import { ApiError } from '../../shared/utils/ApiError.js'
import { Course } from '../course/course.model.js'
import { TAXONOMY_TYPES } from './taxonomy.constants.js'
import { Taxonomy } from './taxonomy.model.js'

const toDto = ({ _id, __v, ...rest }) => ({ id: String(_id), ...rest })

// "Early Childhood & Care" → "early-childhood-care"; numbered when taken.
async function uniqueKey(type, label) {
  const base = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item'
  let key = base
  for (let n = 2; await Taxonomy.exists({ type, key }); n++) key = `${base}-${n}`
  return key
}

async function findOrThrow(type, id) {
  const item = await Taxonomy.findOne({ _id: id, type })
  if (!item) throw ApiError.notFound(`That ${TAXONOMY_TYPES[type].noun} no longer exists`)
  return item
}

export const taxonomyService = {
  // Items in order, each with how many (non-archived) courses use it.
  async list(type) {
    const { field } = TAXONOMY_TYPES[type]
    const [items, usage] = await Promise.all([
      Taxonomy.find({ type }).sort({ order: 1, label: 1 }).lean(),
      Course.aggregate([{ $match: { status: { $ne: 'archived' } } }, { $group: { _id: `$${field}`, count: { $sum: 1 } } }]),
    ])
    const counts = Object.fromEntries(usage.map((u) => [u._id, u.count]))
    return items.map((i) => ({ ...toDto(i), courses: counts[i.key] ?? 0 }))
  },

  async keys(type) {
    return Taxonomy.distinct('key', { type })
  },

  async create(type, { label, order }) {
    const last = await Taxonomy.findOne({ type }).sort({ order: -1 }).lean()
    const item = await Taxonomy.create({ type, label, key: await uniqueKey(type, label), order: order ?? (last?.order ?? 0) + 1 })
    return { ...toDto(item.toObject()), courses: 0 }
  },

  async update(type, id, data) {
    const item = await findOrThrow(type, id)
    item.set(data)
    await item.save()
    return toDto(item.toObject())
  },

  async reorder(type, ids) {
    await Taxonomy.bulkWrite(ids.map((_id, order) => ({ updateOne: { filter: { _id, type }, update: { order } } })))
    return this.list(type)
  },

  // Refuses while any course (archived ones included) still uses the item.
  async remove(type, id) {
    const item = await findOrThrow(type, id)
    const { field, noun } = TAXONOMY_TYPES[type]
    const inUse = await Course.countDocuments({ [field]: item.key })
    if (inUse) throw ApiError.conflict(`${inUse} course${inUse === 1 ? ' uses' : 's use'} this ${noun}. Move ${inUse === 1 ? 'it' : 'them'} to another ${noun} first.`)
    await item.deleteOne()
  },
}
