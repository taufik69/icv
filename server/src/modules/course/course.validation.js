import { z } from 'zod'
import { MARKETS, STATUSES } from './course.constants.js'

// Request-shape checks for identity fields; nested blocks (facts, fees, units…) are enforced by the Mongoose schema.
const market = z.enum(MARKETS)
const slug = z.string({ error: 'Page address is required' }).trim().regex(/^[a-z0-9-]+$/, 'Page address: lowercase letters, digits and dashes only')
const id = z.string().regex(/^[a-f\d]{24}$/i, 'invalid id')
const block = z.unknown().optional()
const required = (label) => z.string({ error: `${label} is required` }).trim().min(1, `${label} is required`)

const BLOCKS = [
  'facts', 'fees', 'paymentOptions', 'detail', 'units', 'images', 'overview', 'actions', 'glance', 'funding', 'career',
  'detailsTitle', 'details', 'criteria', 'extras', 'placement', 'rpl', 'employment', 'cta', 'seo',
]

const courseBody = z.object({
  market,
  slug,
  code: required('Course code'),
  applyCode: z.string().trim().optional(),
  title: required('Course title'),
  level: required('Level'),
  studyArea: required('Study area'),
  category: z.string().optional(),
  status: z.enum(STATUSES).optional(),
  order: z.number().int().optional(),
  featured: z.boolean().optional(),
  summary: z.string().max(300).optional(),
  tagline: z.string().optional(),
  externalUrl: z.url().optional().or(z.literal('')),
  ...Object.fromEntries(BLOCKS.map((key) => [key, block])),
})

export const courseValidation = {
  list: {
    query: z.object({ market: market.optional(), area: z.string().trim().max(60).optional(), featured: z.enum(['true', 'false']).optional() }),
  },
  bySlug: { params: z.object({ market, slug }) },
  byId: { params: z.object({ id }) },
  adminList: {
    query: z.object({ market: market.optional(), status: z.enum(STATUSES).optional(), q: z.string().trim().max(100).optional() }),
  },
  create: { body: courseBody },
  update: { body: courseBody.partial() },
  status: { body: z.object({ status: z.enum(STATUSES) }) },
}
