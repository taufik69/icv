import { catalogueExtras } from './catalogueExtras'

// Course data is code-split: each course folder loads only when its page is visited.
// Folders: data/<market>/<slug>/index.js where market is 'domestic' or 'international'.
const loaders = {
  domestic: import.meta.glob('./domestic/*/index.js'),
  international: import.meta.glob('./international/*/index.js'),
}

export async function loadCourse(market, slug) {
  const load = loaders[market]?.[`./${market}/${slug}/index.js`]
  if (!load) return null
  const mod = await load()
  return { slug, market, ...mod.default }
}

// Every course, for the course finder: all course chunks (loaded in parallel) plus catalogue-only extras.
export function loadCatalogue() {
  const entries = Object.entries(loaders).flatMap(([market, glob]) =>
    Object.keys(glob).map((path) => [market, path.split('/')[2]]),
  )
  return Promise.all(entries.map(([market, slug]) => loadCourse(market, slug))).then((all) => [...all, ...catalogueExtras])
}
