import { readdirSync, statSync } from 'node:fs'
import { register } from 'node:module'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

register('./extensionlessHook.js', import.meta.url)

// Reads the course modules the website ships today (client/src/features/courses/data) so they can be imported.
const DATA = new URL('../../../../client/src/features/courses/data/', import.meta.url)
const load = async (path) => import(new URL(path, DATA).href)

// Landing cards give each course its summary, card image, filter chip and grid order.
async function landingCards() {
  const [{ domesticContent }, { internationalContent }] = await Promise.all([
    load('domestic/landing.js'),
    load('international/landing.js'),
  ])
  const cards = {}
  for (const [market, content] of [['domestic', domesticContent], ['international', internationalContent]]) {
    content.courses.items.forEach((item, order) => {
      const slug = item.to?.split('/').pop()
      if (slug) cards[`${market}/${slug}`] = { ...item, order }
    })
  }
  return cards
}

export async function loadClientCourses() {
  const dataDir = DATA.pathname
  const modules = []
  for (const market of ['domestic', 'international']) {
    for (const slug of readdirSync(join(dataDir, market))) {
      if (!statSync(join(dataDir, market, slug)).isDirectory()) continue
      const mod = await import(pathToFileURL(join(dataDir, market, slug, 'index.js')).href)
      modules.push({ market, slug, ...mod.default })
    }
  }
  const { catalogueExtras } = await load('catalogueExtras.js')
  return { modules: [...modules, ...catalogueExtras], cards: await landingCards() }
}
