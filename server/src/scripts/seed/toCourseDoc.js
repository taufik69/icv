import { detailFrom, unitsFrom } from './detailFrom.js'
import { factsFrom, feesFrom, paymentOptionsFrom } from './glanceFacts.js'

// Turns one client course module (+ its landing card) into a `courses` document.
const APPLY_CODES = { CPCWHS1001: 'CPCCWHS1001' }

// The eight courses the home page's "Our popular courses" showed before it read from the API.
const HOME_FEATURED = new Set([
  'international/certificate-iii-in-carpentry', 'international/cert-iv-building-and-construction',
  'international/diploma-of-building-and-construction', 'domestic/white-card', 'domestic/cert-iv-ageing-support',
  'domestic/certificate-iv-in-disability', 'domestic/cert-iii-early-childhood', 'domestic/diploma-of-early-childhood',
])

function level(title) {
  if (/^graduate diploma/i.test(title)) return 'Graduate Diploma'
  if (/^diploma/i.test(title)) return 'Diploma'
  if (/^certificate iv/i.test(title)) return 'Certificate IV'
  if (/^certificate iii/i.test(title)) return 'Certificate III'
  return 'Short course'
}

function studyArea(course, card) {
  if (card?.category) return card.category
  const text = `${course.code} ${course.category ?? ''} ${course.title}`
  if (/WHS1001|white card|work safely/i.test(text)) return 'whiteCard'
  if (/early childhood/i.test(text)) return 'ecec'
  if (/community|ageing|disab/i.test(text)) return 'community'
  if (/management|^BSB/i.test(text)) return 'management'
  return 'building'
}

const clean = (obj) => JSON.parse(JSON.stringify(obj)) // drop undefined keys

export function toCourseDoc(course, card) {
  const { market, slug, href, glance: tuples, units, images, ...blocks } = course
  return clean({
    ...blocks,
    market,
    slug,
    applyCode: APPLY_CODES[course.code],
    level: level(course.title),
    studyArea: studyArea(course, card),
    status: 'active',
    order: card?.order ?? 99,
    featured: HOME_FEATURED.has(`${market}/${slug}`),
    summary: card?.text?.slice(0, 300),
    externalUrl: href,
    facts: factsFrom(tuples),
    fees: feesFrom(tuples),
    paymentOptions: paymentOptionsFrom(tuples),
    detail: detailFrom(course),
    units: unitsFrom(units),
    images: { ...images, card: card?.image ?? images?.hero },
    glance: tuples?.map(([label, value]) => ({ label, value })),
  })
}
