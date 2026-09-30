import { z } from 'zod'
import { OPTIONAL_FIELDS, STATUSES, STUDENT_TYPES } from './application.constants.js'

// Same rules as the website form: student type, names and email are required; the rest is optional text.
const text = (max) => z.string().trim().max(max).optional().default('')
const optional = Object.fromEntries(OPTIONAL_FIELDS.map((f) => [f, text(f === 'message' ? 5000 : 200)]))

const createBody = z.object({
  studentType: z.enum(STUDENT_TYPES),
  firstName: z.string().trim().min(1, 'required').max(80),
  lastName: z.string().trim().min(1, 'required').max(80),
  email: z.email().max(200),
  ...optional,
})

export const applicationValidation = {
  create: { body: createBody },
  list: { query: z.object({ status: z.enum(STATUSES).optional(), q: z.string().trim().max(100).optional() }) },
  byId: { params: z.object({ id: z.string().regex(/^[a-f\d]{24}$/i, 'invalid id') }) },
  update: { body: z.object({ status: z.enum(STATUSES) }) },
}
