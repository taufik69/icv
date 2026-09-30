// Filtering, facet counts and sorting for the course finder. `filters` =
// { market, q, sort, area: [], level: [], delivery: [], length: [] } — an empty facet list means "any".
export const facetKeys = ['area', 'level', 'delivery', 'length']

const levelOrder = ['Short course', 'Certificate III', 'Certificate IV', 'Diploma', 'Graduate Diploma']

const matchesText = (course, q) => {
  const needle = q.trim().toLowerCase()
  return !needle || [course.title, course.code, course.area].some((v) => v.toLowerCase().includes(needle))
}

function matches(course, filters, skip) {
  if (filters.market !== 'all' && course.market !== filters.market) return false
  if (!matchesText(course, filters.q)) return false
  return facetKeys.every((key) => key === skip || !filters[key].length || filters[key].includes(course[key]))
}

const sorters = {
  recommended: () => 0,
  title: (a, b) => a.title.localeCompare(b.title),
  shortest: (a, b) => a.weeks - b.weeks,
  longest: (a, b) => b.weeks - a.weeks,
  fee: (a, b) => a.feeValue - b.feeValue,
}

export function filterCourses(courses, filters) {
  return courses.filter((c) => matches(c, filters)).sort(sorters[filters.sort] ?? sorters.recommended)
}

// Options per facet with how many results each would give, keeping the other active filters.
export function facetOptions(courses, filters, key) {
  const values = [...new Set(courses.map((c) => c[key]))]
  if (key === 'level') values.sort((a, b) => levelOrder.indexOf(a) - levelOrder.indexOf(b))
  if (key === 'length') values.sort((a, b) => courses.find((c) => c.length === a).weeks - courses.find((c) => c.length === b).weeks)
  const pool = courses.filter((c) => matches(c, filters, key))
  return values.map((value) => ({ value, count: pool.filter((c) => c[key] === value).length }))
}

export const marketCounts = (courses, filters) => ({
  all: courses.filter((c) => matches(c, { ...filters, market: 'all' })).length,
  domestic: courses.filter((c) => matches(c, { ...filters, market: 'domestic' })).length,
  international: courses.filter((c) => matches(c, { ...filters, market: 'international' })).length,
})

export const activeFilterCount = (filters) => facetKeys.reduce((n, key) => n + filters[key].length, 0)
