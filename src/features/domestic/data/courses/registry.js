// Course data is code-split: each course folder loads only when its page is visited.
const loaders = import.meta.glob('./*/index.js')

export const courseSlugs = Object.keys(loaders).map((path) => path.split('/')[1])

export async function loadCourse(slug) {
  const load = loaders[`./${slug}/index.js`]
  if (!load) return null
  const mod = await load()
  return { slug, ...mod.default }
}
