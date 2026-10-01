// API shape: `id` instead of `_id`, no `__v`.
export const toDto = ({ _id, __v, ...rest }) => ({ id: String(_id), ...rest })

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Case-insensitive match on title or code, for the dashboard search box.
export function searchFilter(q) {
  if (!q) return {}
  const rx = new RegExp(escapeRegex(q), 'i')
  return { $or: [{ title: rx }, { code: rx }] }
}

// Related courses: same study area first, then same market, then the rest. `pool` excludes the course's own code.
export function rankRelated(course, pool, count = 2) {
  const rank = (c) => (c.studyArea === course.studyArea ? 0 : c.market === course.market ? 1 : 2)
  return [...pool].sort((a, b) => rank(a) - rank(b) || a.order - b.order).slice(0, count)
}
