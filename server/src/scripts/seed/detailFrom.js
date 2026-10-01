// The course detail page's typed sections, pulled out of the verbatim page blocks once at import time.
const findDetail = (course, pattern) => course.details?.find((d) => pattern.test(d.title ?? ''))
const CODE = /\b[A-Z]{3,5}\d{5}\b/g
const textOf = (parts = []) => parts.flatMap((p) => (typeof p === 'string' ? [p] : p.list ?? p.chips ?? [])).join(' ')

// Some pages tuck the further-study list inside entry requirements (e.g. CHC30125): split it out.
function splitEntry(parts = []) {
  const at = parts.findIndex((p) => typeof p === 'string' && /pathway/i.test(p))
  return at > 0 ? [parts.slice(0, at), parts.slice(at)] : [parts, null]
}

function guideUrl(course) {
  const actions = [...(course.actions ?? []), ...(course.cta?.actions ?? [])]
  return actions.find((a) => /outline|flyer|brochure|guide/i.test(a.label))?.href
}

export function detailFrom(course) {
  const [entry, inlinePathways] = splitEntry(findDetail(course, /entr[yi]/i)?.parts)
  const pathways = findDetail(course, /pathway/i)?.parts ?? inlinePathways
  const additional = findDetail(course, /additional/i)
  const careers = [course.career, course.employment].flatMap((b) => b?.parts ?? []).flatMap((p) => p.chips ?? [])
  return {
    entryRequirements: entry.length ? entry : undefined,
    additionalRequirements: additional && {
      title: additional.title,
      items: additional.parts.flatMap((p) => (typeof p === 'string' ? [p] : p.list ?? [])),
    },
    pathways: pathways ?? undefined,
    pathwayCodes: pathways ? [...new Set(textOf(pathways).match(CODE) ?? [])] : undefined,
    careers: careers.length ? [...new Set(careers)] : undefined,
    guideUrl: guideUrl(course),
  }
}

// Core/elective tuples or table rows → one unit list.
export function unitsFrom(units) {
  if (!units) return undefined
  const { core, elective, table, ...rest } = units
  if (table) {
    const items = table.rows.map(([code, title, type, hours, selfPaced]) => ({
      code, title, type: /core/i.test(type) ? 'core' : 'elective', typeLabel: type,
      hours: Number(hours) || undefined, selfPacedHours: Number(selfPaced) || undefined,
    }))
    return { ...rest, display: 'table', tableTitle: table.title, columns: table.columns, items }
  }
  const map = (type) => (list = []) => list.map(([code, title, href]) => ({ code, title, type, href }))
  return { ...rest, display: 'tabs', items: [...map('core')(core), ...map('elective')(elective)] }
}
