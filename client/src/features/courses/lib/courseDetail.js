// Pulls the course-detail sections out of a full course module (data/<market>/<slug>/index.js).
// Each helper returns null when the course has nothing for that section, so the page can skip it.
const findDetail = (course, pattern) => course.details?.find((d) => pattern.test(d.title ?? ''))

// Units as [{ code, title, type }], from core/elective lists or table-mode rows.
export function unitList(units) {
  if (!units) return null
  if (units.table) return units.table.rows.map(([code, title, type]) => ({ code, title, type: /core/i.test(type) ? 'Core' : 'Elective' }))
  const map = (type) => (list = []) => list.map(([code, title]) => ({ code, title, type }))
  return [...map('Core')(units.core), ...map('Elective')(units.elective)]
}

export const entryRequirements = (course) => findDetail(course, /entr[yi]/i)?.parts ?? null
export const studyPathways = (course) => findDetail(course, /pathway/i)?.parts ?? null

// Fee rows from the glance table (tuition, application, material, fee-for-service…); tuition first.
const feeRank = (label) => (/tuition/i.test(label) ? 0 : /ffs/i.test(label) ? 1 : 2)
export const feeRows = (course) =>
  course.glance
    ?.filter(([label]) => /fee|ffs/i.test(label))
    .sort(([a], [b]) => feeRank(a) - feeRank(b))
    .map(([label, value]) => ({ label: label.replace(/\s*\(\s*Fee for Service\)/i, ' (fee for service)'), value: value.replace(/^\$\s+/, '$') })) ?? []

// Career titles gathered from the career and employment blocks' chip lists.
export function careerTitles(course) {
  const chips = [course.career, course.employment].flatMap((block) => block?.parts ?? []).flatMap((p) => p.chips ?? [])
  return [...new Set(chips)]
}

// Which student types this course is offered to (same code in the other market counts).
export const marketsFor = (course, catalogue) => [...new Set(catalogue.filter((c) => c.code === course.code).map((c) => c.market))]

// Always two related courses: same study area first, then same student type, then anything else.
export function relatedCourses(course, catalogue, count = 2) {
  const others = catalogue.filter((c) => c.id !== course.id && c.code !== course.code)
  const rank = (c) => (c.area === course.area ? 0 : c.market === course.market ? 1 : 2)
  return [...others].sort((a, b) => rank(a) - rank(b)).slice(0, count)
}
