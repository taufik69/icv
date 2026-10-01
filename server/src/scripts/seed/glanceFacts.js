// Typed facts and fees from a course's verbatim "at a glance" rows ([label, value] tuples in the client data).
// Same rules the website uses today (client/src/features/courses/lib/courseSummary.js + courseDetail.js).
const find = (glance, pattern) => glance?.find(([label]) => pattern.test(label))?.[1]?.trim()

export function durationWeeks(value = '') {
  if (/hour/i.test(value)) return 0
  const upper = Math.max(0, ...(value.match(/\d+/g)?.map(Number) ?? []))
  return /month/i.test(value) ? Math.round(upper * 4.33) : upper
}

function delivery(value = '') {
  if (/blended/i.test(value)) return 'Blended'
  if (/face to face/i.test(value)) return 'Face to face'
  if (/classroom/i.test(value)) return 'In classroom'
  if (/online/i.test(value)) return 'Online'
  return undefined
}

function studyMode(value = '') {
  if (/full/i.test(value)) return 'Full-Time'
  if (/part/i.test(value)) return 'Part-Time'
  return value ? 'Flexible' : undefined
}

export function factsFrom(glance) {
  const durationText = find(glance, /^duration/i)
  const deliveryText = find(glance, /^delivery mode/i)
  const placement = find(glance, /placement/i)
  return {
    durationText,
    durationWeeks: durationText ? durationWeeks(durationText) : undefined,
    delivery: delivery(deliveryText),
    deliveryText,
    studyMode: studyMode(find(glance, /^study mode/i)),
    intake: find(glance, /^start date/i) ?? 'Monthly Intake',
    campus: 'Melbourne CBD',
    placementHours: placement ? Number(placement.match(/\d+/)?.[0]) || undefined : undefined,
    cricosCode: find(glance, /cricos/i),
  }
}

const feeKind = (label) =>
  /tuition/i.test(label) ? 'tuition' : /ffs|fee for service/i.test(label) ? 'ffs'
    : /application/i.test(label) ? 'application' : /material/i.test(label) ? 'material' : 'other'

// "$9,000" → 900000 cents; wording that isn't a plain amount ("0* Fee for Eligible Students") is kept as text.
function fee([label, raw]) {
  const value = raw.trim()
  const amount = value.match(/^\$\s*([\d,]+(?:\.\d+)?)/)?.[1]
  const amountCents = amount ? Math.round(Number(amount.replace(/,/g, '')) * 100) : undefined
  const plain = /^\$\s*[\d,]+(\.\d+)?$/.test(value)
  return { kind: feeKind(label), label, amountCents, text: plain ? undefined : value }
}

export const feesFrom = (glance = []) => glance.filter(([label]) => /fee|ffs/i.test(label) && !/payment/i.test(label)).map(fee)
export const paymentOptionsFrom = (glance) => find(glance, /payment/i)
