import { toFormCode } from '@/features/apply'

// Turns a full course module (data/<market>/<slug>/index.js) into the small record the course finder shows.
// Values come from the course's own "glance" table, so the finder never disagrees with the course page.
const glanceValue = (glance, pattern) => glance?.find(([label]) => pattern.test(label))?.[1]?.trim()

export function qualificationLevel(title) {
  if (/^graduate diploma/i.test(title)) return 'Graduate Diploma'
  if (/^diploma/i.test(title)) return 'Diploma'
  if (/^certificate iv/i.test(title)) return 'Certificate IV'
  if (/^certificate iii/i.test(title)) return 'Certificate III'
  return 'Short course'
}

export function deliveryMode(value = '') {
  if (/blended/i.test(value)) return 'Blended'
  if (/face to face/i.test(value)) return 'Face to face'
  if (/classroom/i.test(value)) return 'In classroom'
  return value
}

// Longest end of the stated duration, in weeks ("6 - 9 months" → 39, "6 Hours" → 0).
export function durationWeeks(value = '') {
  const numbers = value.match(/\d+/g)?.map(Number) ?? []
  const upper = Math.max(0, ...numbers)
  if (/hour/i.test(value)) return 0
  if (/month/i.test(value)) return Math.round(upper * 4.33)
  return upper
}

export function lengthBand(weeks) {
  if (weeks < 26) return 'Under 6 months'
  if (weeks <= 52) return '6 to 12 months'
  return 'Over 12 months'
}

// Headline price: the tuition fee when it is a dollar amount, otherwise the fee-for-service price,
// with the tuition wording kept as a note (e.g. "0* Fee for Eligible Students").
function price(glance) {
  const tuition = glanceValue(glance, /^tuition fee/i)
  const ffs = glanceValue(glance, /^ffs/i)
  const clean = (v) => v?.replace(/^\$\s+/, '$').replace(/\.00$/, '')
  if (tuition?.startsWith('$')) return { amount: clean(tuition), basis: 'tuition' }
  if (ffs) return { amount: clean(ffs), basis: 'fee for service', note: /^0\*/.test(tuition ?? '') ? tuition : undefined }
  return { amount: clean(tuition), basis: 'tuition' }
}

// ICV teaches from its Melbourne CBD campus; courses whose glance names no place fall back to it,
// and a missing start date falls back to the monthly intake every other course lists.
const CAMPUS = 'Melbourne CBD'
const DEFAULT_INTAKE = 'Monthly Intake'

export function summariseCourse(course) {
  const duration = glanceValue(course.glance, /^duration/i)
  const weeks = durationWeeks(duration)
  const fee = price(course.glance)

  return {
    id: `${course.market}/${course.slug}`,
    market: course.market,
    code: course.code,
    title: course.title,
    area: course.category,
    level: qualificationLevel(course.title),
    duration,
    weeks,
    length: lengthBand(weeks),
    delivery: deliveryMode(glanceValue(course.glance, /^delivery mode/i)),
    intake: glanceValue(course.glance, /^start date/i) ?? DEFAULT_INTAKE,
    location: CAMPUS,
    fee,
    feeValue: Number(fee.amount?.replace(/[^\d.]/g, '')) || 0,
    image: course.images.hero,
    ...(course.href ? { href: course.href } : { to: `/courses/${course.market}/${course.slug}` }),
    enquire: `/enquire-now?course=${toFormCode(course.code)}`,
    // The enrolment form lists international courses only; domestic "Apply" stays on the enquiry form.
    apply: course.market === 'international' ? `/apply?course=${course.code}` : `/enquire-now?course=${toFormCode(course.code)}`,
  }
}
