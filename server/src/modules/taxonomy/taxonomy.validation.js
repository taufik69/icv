import { z } from 'zod'
import { ICONS, TAXONOMY_TYPES } from './taxonomy.constants.js'

const type = z.enum(Object.keys(TAXONOMY_TYPES))
const id = z.string().regex(/^[a-f\d]{24}$/i, 'invalid id')
const label = z.string({ error: 'Name is required' }).trim().min(1, 'Name is required').max(80)
const icon = z.enum(ICONS).optional()

export const taxonomyValidation = {
  byType: { params: z.object({ type }) },
  byId: { params: z.object({ type, id }) },
  create: { body: z.object({ label, icon, order: z.number().int().optional() }) },
  update: { body: z.object({ label: label.optional(), icon, order: z.number().int().optional() }) },
  reorder: { body: z.object({ ids: z.array(id).min(1) }) },
}
