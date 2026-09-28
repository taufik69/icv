import { Router } from 'express'
import { validate } from '../../shared/middleware/validate.js'
import { courseController as c } from './course.controller.js'
import { courseValidation as v } from './course.validation.js'

// TODO: guard POST/PATCH/DELETE with admin auth once an auth module exists.
export const courseRouter = Router()

courseRouter.get('/', validate(v.list), c.list)
courseRouter.get('/:market/:slug', validate(v.bySlug), c.getBySlug)
courseRouter.post('/', validate(v.create), c.create)
courseRouter.patch('/:id', validate({ ...v.byId, ...v.update }), c.update)
courseRouter.delete('/:id', validate(v.byId), c.remove)
