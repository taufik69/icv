import { Router } from 'express'
import { z } from 'zod'
import { validate } from '../../shared/middleware/validate.js'
import { RANGES } from './stats.constants.js'
import { overview } from './stats.service.js'

// GET /admin/stats?days=30 — numbers for the dashboard overview. TODO: guard with staff auth.
export const statsRouter = Router()

const query = z.object({ days: z.coerce.number().refine((d) => RANGES.includes(d), `use one of ${RANGES.join(', ')}`).default(30) })

statsRouter.get('/', validate({ query }), async (req, res) => {
  res.json({ data: await overview(req.valid.query.days) })
})
