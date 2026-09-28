import { domesticContent, internationalContent } from '@/features/courses'

// Rows for the courses table, built from the site's current course cards until the API serves them.
const filterLabel = Object.fromEntries(domesticContent.courses.filters.map((f) => [f.id, f.label]))
const toSentence = (label) => label.charAt(0) + label.slice(1).toLowerCase()

const rows = (content, market) =>
  content.courses.items.map((item) => ({
    ...item,
    market,
    marketId: market.toLowerCase(),
    slug: item.to.split('/').pop(),
    category: item.category ? toSentence(filterLabel[item.category]) : 'International',
  }))

export const courseRows = [...rows(domesticContent, 'Domestic'), ...rows(internationalContent, 'International')]

export const marketTabs = [
  { label: 'All', count: courseRows.length, active: true },
  { label: 'Domestic', count: courseRows.filter((c) => c.market === 'Domestic').length },
  { label: 'International', count: courseRows.filter((c) => c.market === 'International').length },
]
