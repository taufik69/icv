import { ApiError } from '../../shared/utils/ApiError.js'
import { CARD_FIELDS } from './course.constants.js'
import { Course } from './course.model.js'

// Data access for courses. Public reads only return published courses.
export const courseService = {
  list({ market, filter } = {}) {
    const query = { published: true, ...(market && { market }), ...(filter && { filter }) }
    return Course.find(query).select(CARD_FIELDS).sort({ market: 1, order: 1, title: 1 }).lean()
  },

  async getBySlug(market, slug) {
    const course = await Course.findOne({ market, slug, published: true }).lean()
    if (!course) throw ApiError.notFound(`Course not found: ${market}/${slug}`)
    return course
  },

  async create(data) {
    const course = await Course.create(data)
    return course.toObject()
  },

  async update(id, data) {
    const course = await Course.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean()
    if (!course) throw ApiError.notFound('Course not found')
    return course
  },

  async remove(id) {
    const course = await Course.findByIdAndDelete(id).lean()
    if (!course) throw ApiError.notFound('Course not found')
  },
}
