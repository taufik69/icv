import { Router } from 'express'
import { validate } from '../../shared/middleware/validate.js'
import { applicationController as c } from './application.controller.js'
import { applicationValidation as v } from './application.validation.js'

// POST is public (the website form). TODO: guard GET/PATCH/DELETE with admin auth once it exists,
// and add rate limiting / spam protection to POST before going live.
export const applicationRouter = Router()

applicationRouter.post('/', validate(v.create), c.create)
applicationRouter.get('/', validate(v.list), c.list)
applicationRouter.get('/:id', validate(v.byId), c.getById)
applicationRouter.patch('/:id', validate({ ...v.byId, ...v.update }), c.update)
applicationRouter.delete('/:id', validate(v.byId), c.remove)
