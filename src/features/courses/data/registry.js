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
