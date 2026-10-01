import { ApiError } from '../../shared/utils/ApiError.js'
import { sanitizeRichText } from '../../shared/utils/sanitizeRichText.js'
import { ADMIN_LIST_FIELDS } from './course.constants.js'
import { searchFilter, toDto } from './course.mapper.js'
import { taxonomyService } from '../taxonomy/taxonomy.service.js'
import { Course } from './course.model.js'

// Dashboard data access: every status is visible; "delete" archives instead of removing.
// Writes go through save() so schema validators and the publishedAt hook always run.
// Rich text fields ([block, key]) are cleaned server-side so only safe, allow-listed HTML is ever stored.
const RICH_TEXT = [['overview', 'html'], ['detail', 'entryRequirementsHtml'], ['units', 'html']]

const clean = (data) =>
  RICH_TEXT.reduce((out, [block, key]) => {
    const html = out[block]?.[key]
    return typeof html === 'string' ? { ...out, [block]: { ...out[block], [key]: sanitizeRichText(html) } } : out
  }, data)

// Study area and level must be items staff created under Study areas / Levels.
async function checkTaxonomies({ studyArea, level }) {
  const checks = [['study-areas', studyArea, 'studyArea', 'study area'], ['levels', level, 'level', 'level']]
  const details = {}
  for (const [type, key, field, noun] of checks) {
    if (key !== undefined && !(await taxonomyService.keys(type)).includes(key)) details[field] = [`Choose a ${noun} from the list`]
  }
  if (Object.keys(details).length) throw ApiError.badRequest('Invalid body', details)
}

async function findOrThrow(id) {
  const course = await Course.findById(id)
  if (!course) throw ApiError.notFound('Course not found')
  return course
}

export const courseAdminService = {
  async list({ market, status, q } = {}) {
    const statusFilter = status ? { status } : { status: { $ne: 'archived' } }
    const query = { ...statusFilter, ...searchFilter(q) }
    const [items, counts] = await Promise.all([
      Course.find({ ...query, ...(market && { market }) }).select(ADMIN_LIST_FIELDS).sort({ market: 1, order: 1, title: 1 }).lean(),
      Course.aggregate([{ $match: query }, { $group: { _id: '$market', count: { $sum: 1 } } }]),
    ])
    const byMarket = Object.fromEntries(counts.map((c) => [c._id, c.count]))
    const all = counts.reduce((sum, c) => sum + c.count, 0)
    return { items: items.map(toDto), counts: { all, domestic: byMarket.domestic ?? 0, international: byMarket.international ?? 0 } }
  },

  async getByPage(market, slug) {
    const course = await Course.findOne({ market, slug }).lean()
    if (!course) throw ApiError.notFound(`Course not found: ${market}/${slug}`)
    return toDto(course)
  },

  async getById(id) {
    return toDto((await findOrThrow(id)).toObject())
  },

  async create(data) {
    await checkTaxonomies(data)
    const course = await Course.create(clean(data))
    return toDto(course.toObject())
  },

  async update(id, data) {
    await checkTaxonomies(data)
    const course = await findOrThrow(id)
    course.set(clean(data))
    await course.save()
    return toDto(course.toObject())
  },

  async setStatus(id, status) {
    return this.update(id, { status })
  },

  async archive(id) {
    await this.update(id, { status: 'archived' })
  },
}
