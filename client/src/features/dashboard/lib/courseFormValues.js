import { canEditAsText, listToLines, partsToText } from './partsText'
import { entryHtml, overviewHtml, packagingHtml } from './partsToHtml'

// API course → form state. Text areas hold Parts as plain text; money is edited in dollars.
const str = (v) => (v === undefined || v === null ? '' : String(v))
const dollars = (cents) => (cents === undefined ? '' : String(cents / 100))
const image = (img) => ({ ...img, src: str(img?.src), alt: str(img?.alt) })

// Repeatable lists start with one empty row ready to fill in (dropped on save if left empty).
export const blankRows = {
  fee: { kind: 'tuition', label: '', amount: '', text: '' },
  glance: { label: '', value: '' },
  unit: { code: '', title: '' },
}
const orBlank = (rows, blank) => (rows.length ? rows : [{ ...blank }])

// Rows with any text in them (ignores the untouched starter row and select-only cells).
export const filledRows = (rows, keys) => rows.filter((r) => keys.some((k) => String(r[k] ?? '').trim()))

export const emptyCourse = { market: 'domestic', studyArea: 'building', level: 'Certificate IV', status: 'draft' }

export function toFormValues(course = emptyCourse) {
  const { facts = {}, detail = {}, units = {} } = course
  return {
    ...Object.fromEntries(['title', 'code', 'slug', 'applyCode', 'category', 'tagline', 'summary', 'externalUrl'].map((k) => [k, str(course[k])])),
    market: course.market,
    studyArea: course.studyArea,
    level: course.level,
    featured: Boolean(course.featured),
    images: { hero: image(course.images?.hero), card: image(course.images?.card) },
    overviewHtml: overviewHtml(course.overview),
    facts: Object.fromEntries(
      ['durationText', 'durationWeeks', 'delivery', 'deliveryText', 'studyMode', 'campus', 'intake', 'placementHours', 'cricosCode']
        .map((k) => [k, str(facts[k])]),
    ),
    fees: orBlank((course.fees ?? []).map((f) => ({ kind: f.kind, label: f.label, amount: dollars(f.amountCents), text: str(f.text) })), blankRows.fee),
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
    glance: orBlank((course.glance ?? []).map((g) => ({ ...g })), blankRows.glance),
    units: {
      title: str(units.title),
      rulesHtml: packagingHtml(units),
      display: units.display ?? 'tabs',
      core: orBlank((units.items ?? []).filter((u) => u.type === 'core'), blankRows.unit),
      elective: orBlank((units.items ?? []).filter((u) => u.type === 'elective'), blankRows.unit),
    },
  }
}
