import { loadCourse } from '../data/registry'
import { summariseCourse } from './courseSummary'

// Finder-style summaries for the courses a landing page lists (items with an internal `to` like
// '/domestic/<slug>'), loading only those course chunks. Keyed by summary id ('<market>/<slug>').
export async function loadLandingCourses(content) {
  const paths = content.courses.items.map((item) => item.to?.split('/')).filter((p) => p?.length === 3)
  const courses = await Promise.all(paths.map(([, market, slug]) => loadCourse(market, slug)))
  return Object.fromEntries(courses.filter(Boolean).map((c) => [`${c.market}/${c.slug}`, summariseCourse(c)]))
}
