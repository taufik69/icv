import { courseFormBlocks } from '../data/courseFormBlocks'
import { filledRows } from './courseFormValues'

// Page-outline state for a saved course: a block is "filled" when the course has content for it.
const has = (v) => (Array.isArray(v) ? v.length > 0 : Boolean(v && (typeof v !== 'object' || Object.keys(v).length)))
const pick = {
  basics: (c) => c.title,
  overview: (c) => c.overview?.html || c.overview?.paragraphs,
  facts: (c) => c.facts?.durationText,
  units: (c) => c.units?.items,
  entry: (c) => c.detail?.entryRequirementsHtml || c.detail?.entryRequirements,
  careers: (c) => c.detail?.careers || c.detail?.pathways,
  media: (c) => c.images?.hero?.src || c.images?.card?.src,
}

export const courseOutline = (course = {}) =>
  courseFormBlocks.map((block) => ({ ...block, filled: has((pick[block.id] ?? ((c) => c[block.id]))(course)) }))

// Same outline for the form, read from live form values (imported blocks come from the saved course).
export function formOutline(values, course = {}) {
  const live = {
    basics: values.title,
    overview: values.overviewHtml,
    facts: values.facts.durationText,
    units: filledRows([...values.units.core, ...values.units.elective], ['code', 'title']),
    entry: values.detail.entryHtml,
    fees: filledRows(values.fees, ['label', 'amount', 'text']),
    careers: values.detail.careersText || values.detail.pathwaysText,
    media: values.images.hero.src || values.images.card.src,
    glance: filledRows(values.glance, ['label', 'value']),
  }
  // Imported (non-editable) blocks only appear when this course actually has them.
  return courseOutline(course)
    .filter((b) => b.editable || b.filled)
    .map((b) => (b.editable ? { ...b, filled: has(live[b.id]) } : b))
}
