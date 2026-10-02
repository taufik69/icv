import { Router } from 'express'
import { validate } from '../../shared/middleware/validate.js'
import { courseAdminController as a, courseController as c } from './course.controller.js'
import { courseValidation as v } from './course.validation.js'

// Public website reads (active courses only).
export const courseRouter = Router()

courseRouter.get('/', validate(v.list), c.list)
courseRouter.get('/finder', c.finder)
courseRouter.get('/:market/:slug', validate(v.bySlug), c.getPage)

// Dashboard (every status). Staff only (requireAuth on /admin).
export const courseAdminRouter = Router()

courseAdminRouter.get('/', validate(v.adminList), a.list)
courseAdminRouter.post('/', validate(v.create), a.create)
courseAdminRouter.get('/page/:market/:slug', validate(v.bySlug), a.getByPage)
courseAdminRouter.get('/:id', validate(v.byId), a.getById)
courseAdminRouter.patch('/:id', validate({ ...v.byId, ...v.update }), a.update)
courseAdminRouter.patch('/:id/status', validate({ ...v.byId, ...v.status }), a.setStatus)
courseAdminRouter.delete('/:id', validate(v.byId), a.archive)
