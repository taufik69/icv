import { categories } from '../data/coursesContent'

// API course card → the shape the home CourseCard renders. Courses with an external page link out;
// the rest open their course detail page.
export function toHomeCourse(c) {
  const image = c.images?.card ?? c.images?.hero
  return {
    code: c.code,
    title: c.title,
    audience: c.market,
    category: categories[c.studyArea] ?? categories.building,
    overview: c.summary,
    ...(c.externalUrl ? { href: c.externalUrl } : { to: `/courses/${c.market}/${c.slug}` }),
    image: image && { src: image.src, srcSet: image.srcSet },
  }
}
