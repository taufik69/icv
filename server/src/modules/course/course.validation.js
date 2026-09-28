import { z } from 'zod'
import { FILTERS, MARKETS } from './course.constants.js'

// Request-shape checks only; the nested block structure is enforced by the Mongoose schema.
const market = z.enum(MARKETS)
const slug = z.string().regex(/^[a-z0-9-]+$/, 'lowercase letters, digits and dashes only')
const block = z.unknown().optional()

const courseBody = z.object({
  market,
  slug,
  code: z.string().min(1),
  title: z.string().min(1),
  category: z.string().optional(),
  filter: z.enum(FILTERS).optional(),
  summary: z.string().optional(),
  tagline: z.string().optional(),
  order: z.number().int().optional(),
  published: z.boolean().optional(),
  ...Object.fromEntries(
    ['images', 'overview', 'actions', 'glance', 'funding', 'career', 'detailsTitle', 'details', 'criteria',
      'units', 'extras', 'placement', 'rpl', 'employment', 'cta'].map((key) => [key, block]),
  ),
})

export const courseValidation = {
  list: { query: z.object({ market: market.optional(), filter: z.enum(FILTERS).optional() }) },
  bySlug: { params: z.object({ market, slug }) },
  byId: { params: z.object({ id: z.string().regex(/^[a-f\d]{24}$/i, 'invalid id') }) },
  create: { body: courseBody },
  update: { body: courseBody.partial() },
}
