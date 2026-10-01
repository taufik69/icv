import { canEditAsText, listToLines, partsToText } from './partsText'
import { entryHtml, overviewHtml, packagingHtml } from './partsToHtml'

// API course → form state. Text areas hold Parts as plain text; money is edited in dollars.
const str = (v) => (v === undefined || v === null ? '' : String(v))
const dollars = (cents) => (cents === undefined ? '' : String(cents / 100))
const image = (img) => ({ ...img, src: str(img?.src), alt: str(img?.alt) })

export const emptyCourse = { market: 'domestic', studyArea: 'building', level: 'Certificate IV', status: 'draft' }

export function toFormValues(course = emptyCourse) {
  const { facts = {}, detail = {}, units = {} } = course
  return {
    ...Object.fromEntries(['title', 'code', 'slug', 'applyCode', 'category', 'tagline', 'summary', 'externalUrl'].map((k) => [k, str(course[k])])),
    market: course.market,
    studyArea: course.studyArea,
    level: course.level,
    images: { hero: image(course.images?.hero), card: image(course.images?.card) },
    overviewHtml: overviewHtml(course.overview),
    facts: Object.fromEntries(
      ['durationText', 'durationWeeks', 'delivery', 'deliveryText', 'studyMode', 'campus', 'intake', 'placementHours', 'cricosCode']
        .map((k) => [k, str(facts[k])]),
    ),
    fees: (course.fees ?? []).map((f) => ({ kind: f.kind, label: f.label, amount: dollars(f.amountCents), text: str(f.text) })),
    paymentOptions: str(course.paymentOptions),
    detail: {
      entryHtml: entryHtml(detail),
      pathwaysText: partsToText(detail.pathways),
      pathwaysEditable: canEditAsText(detail.pathways),
      additionalTitle: str(detail.additionalRequirements?.title),
      additionalText: listToLines(detail.additionalRequirements?.items),
      careersText: listToLines(detail.careers),
      guideUrl: str(detail.guideUrl),
    },
    glance: (course.glance ?? []).map((g) => ({ ...g })),
    units: {
      title: str(units.title),
      rulesHtml: packagingHtml(units),
      display: units.display ?? 'tabs',
      core: (units.items ?? []).filter((u) => u.type === 'core'),
      elective: (units.items ?? []).filter((u) => u.type === 'elective'),
    },
  }
}
