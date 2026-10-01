import { ApiError } from '../../shared/utils/ApiError.js'
import { Application } from './application.model.js'

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// API shape: `id` instead of `_id`, `receivedAt` from createdAt.
const toDto = ({ _id, __v, createdAt, updatedAt, ...rest }) => ({ id: String(_id), receivedAt: createdAt, updatedAt, ...rest })

export const applicationService = {
  async create(data) {
    const doc = await Application.create(data)
    return toDto(doc.toObject())
  },

  async list({ status, q } = {}) {
    const filter = { ...(status && { status }) }
    if (q) {
      const rx = new RegExp(escapeRegex(q), 'i')
      filter.$or = [{ firstName: rx }, { lastName: rx }, { email: rx }, { course: rx }]
    }
    const [items, counts] = await Promise.all([
      Application.find(filter).sort({ createdAt: -1 }).limit(500).lean(),
      this.counts(),
    ])
    return { items: items.map(toDto), counts }
  },

  // Applications per status, for the dashboard tabs and sidebar badge.
  async counts() {
    const rows = await Application.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])
    return Object.fromEntries(rows.map((r) => [r._id, r.count]))
  },

  async getById(id) {
    const doc = await Application.findById(id).lean()
    if (!doc) throw ApiError.notFound('Application not found')
    return toDto(doc)
  },

  async updateStatus(id, status) {
    const doc = await Application.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }).lean()
    if (!doc) throw ApiError.notFound('Application not found')
    return toDto(doc)
  },

  async remove(id) {
    const doc = await Application.findByIdAndDelete(id).lean()
    if (!doc) throw ApiError.notFound('Application not found')
  },
}
