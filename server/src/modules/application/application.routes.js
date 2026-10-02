import { Router } from 'express'
import { validate } from '../../shared/middleware/validate.js'
import { requireAuth } from '../auth/auth.middleware.js'
import { applicationController as c } from './application.controller.js'
import { applicationValidation as v } from './application.validation.js'

// POST is public (the website form); every other route needs a staff session (requireAuth). TODO:
// add rate limiting / spam protection to POST before going live.
export const applicationRouter = Router()

applicationRouter.post('/', validate(v.create), c.create)
applicationRouter.use(requireAuth) // every route below is for signed-in staff
applicationRouter.get('/', validate(v.list), c.list)
applicationRouter.get('/counts', c.counts)
applicationRouter.get('/:id', validate(v.byId), c.getById)
applicationRouter.patch('/:id', validate({ ...v.byId, ...v.update }), c.update)
applicationRouter.delete('/:id', validate(v.byId), c.remove)
