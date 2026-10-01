import { courseFormBlocks } from '../data/courseFormBlocks'

// Page-outline state for a saved course: a block is "filled" when the course has content for it.
const has = (v) => (Array.isArray(v) ? v.length > 0 : Boolean(v && (typeof v !== 'object' || Object.keys(v).length)))
const pick = {
  basics: (c) => c.title,
  overview: (c) => c.overview?.html || c.overview?.paragraphs,
  facts: (c) => c.facts?.durationText,
  detail: (c) => c.detail?.entryRequirementsHtml || c.detail?.entryRequirements || c.detail?.careers,
  units: (c) => c.units?.items,
}

export const courseOutline = (course = {}) =>
  courseFormBlocks.map((block) => ({ ...block, filled: has((pick[block.id] ?? ((c) => c[block.id]))(course)) }))

// Same outline for the form, read from live form values (imported blocks come from the saved course).
export function formOutline(values, course = {}) {
  const live = {
    basics: values.title,
    overview: values.overviewHtml,
    facts: values.facts.durationText,
    fees: values.fees,
    detail: values.detail.entryHtml || values.detail.careersText,
    glance: values.glance,
    units: [...values.units.core, ...values.units.elective],
  }
  return courseOutline(course).map((b) => (b.editable ? { ...b, filled: has(live[b.id]) } : b))
}
