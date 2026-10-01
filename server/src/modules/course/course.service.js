import { ApiError } from '../../shared/utils/ApiError.js'
import { CARD_FIELDS, FINDER_FIELDS } from './course.constants.js'
import { rankRelated, toDto } from './course.mapper.js'
import { Course } from './course.model.js'

// Public reads: only `active` courses are visible on the website.
const ACTIVE = { status: 'active' }

export const courseService = {
  async list({ market, area } = {}) {
    const query = { ...ACTIVE, ...(market && { market }), ...(area && { studyArea: area }) }
    const items = await Course.find(query).select(CARD_FIELDS).sort({ market: 1, order: 1, title: 1 }).lean()
    return items.map(toDto)
  },

  async finder() {
    const items = await Course.find(ACTIVE).select(FINDER_FIELDS).sort({ order: 1, title: 1 }).lean()
    return items.map(toDto)
  },

  // Everything the course detail page needs in one response: the course, its markets and two related courses.
  async getPage(market, slug) {
    const course = await Course.findOne({ ...ACTIVE, market, slug }).lean()
    if (!course) throw ApiError.notFound(`Course not found: ${market}/${slug}`)

    const [markets, pool] = await Promise.all([
      Course.distinct('market', { ...ACTIVE, code: course.code }),
      Course.find({ ...ACTIVE, code: { $ne: course.code } }).select(FINDER_FIELDS).lean(),
    ])
    const picked = course.detail?.related?.map(String) ?? []
    const manual = pool.filter((c) => picked.includes(String(c._id)))
    const related = manual.length ? manual : rankRelated(course, pool)

    const { status, order, ...page } = course
    return { ...toDto(page), markets, related: related.map(toDto) }
  },
}
