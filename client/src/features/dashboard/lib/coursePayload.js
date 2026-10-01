import { linesToList, textToParts } from './partsText'

// Form state → API body. Untouched verbatim blocks (funding, rpl, cta…) are not sent, so they're kept as they are.
const num = (v) => (v === '' || v === undefined ? undefined : Number(v))
const blankToUndef = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v === '' ? undefined : v]))
const CODE = /\b[A-Z]{3,5}\d{5}\b/g

// The form holds the whole image object (from the course or a fresh upload); empty src = no image.
const image = (img) => (img.src ? img : undefined)

function detail(d, original = {}) {
  const pathways = d.pathwaysEditable ? textToParts(d.pathwaysText) : original.pathways
  return {
    ...original,
    entryRequirementsHtml: d.entryHtml,
    pathways,
    pathwayCodes: [...new Set(JSON.stringify(pathways ?? []).match(CODE) ?? [])],
    additionalRequirements: d.additionalTitle || d.additionalText ? { title: d.additionalTitle, items: linesToList(d.additionalText) } : undefined,
    careers: linesToList(d.careersText),
    guideUrl: d.guideUrl || undefined,
  }
}

export function toCoursePayload(v, original = {}) {
  const units = v.units.core.length || v.units.elective.length || v.units.title
  return {
    ...blankToUndef({ title: v.title, code: v.code, slug: v.slug, market: v.market, studyArea: v.studyArea, level: v.level }),
    featured: v.featured,
    ...Object.fromEntries(['applyCode', 'category', 'tagline', 'summary', 'externalUrl', 'paymentOptions'].map((k) => [k, v[k]])),
    images: { ...original.images, hero: image(v.images.hero), card: image(v.images.card) },
    overview: { ...original.overview, html: v.overviewHtml },
    facts: blankToUndef({ ...v.facts, durationWeeks: num(v.facts.durationWeeks), placementHours: num(v.facts.placementHours) }),
    fees: v.fees.map((f) => blankToUndef({ ...f, amount: undefined, amountCents: f.amount === '' ? undefined : Math.round(Number(f.amount) * 100) })),
    detail: detail(v.detail, original.detail),
    glance: v.glance.filter((g) => g.label && g.value),
    units: units
      ? {
          ...original.units,
          title: v.units.title,
          html: v.units.rulesHtml,
          display: v.units.display,
          items: [...v.units.core.map((u) => ({ ...u, type: 'core' })), ...v.units.elective.map((u) => ({ ...u, type: 'elective' }))],
        }
      : undefined,
  }
}
