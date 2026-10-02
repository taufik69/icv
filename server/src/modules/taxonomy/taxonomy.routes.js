import { Router } from 'express'
import { validate } from '../../shared/middleware/validate.js'
import { taxonomyService as svc } from './taxonomy.service.js'
import { taxonomyValidation as v } from './taxonomy.validation.js'

// /admin/taxonomies/:type — type = study-areas | levels. Staff only (requireAuth on /admin).
export const taxonomyRouter = Router()

taxonomyRouter.get('/:type', validate(v.byType), async (req, res) => {
  res.json({ data: await svc.list(req.valid.params.type) })
})
taxonomyRouter.post('/:type', validate({ ...v.byType, ...v.create }), async (req, res) => {
  res.status(201).json({ data: await svc.create(req.valid.params.type, req.valid.body) })
})
taxonomyRouter.put('/:type/order', validate({ ...v.byType, ...v.reorder }), async (req, res) => {
  res.json({ data: await svc.reorder(req.valid.params.type, req.valid.body.ids) })
})
taxonomyRouter.patch('/:type/:id', validate({ ...v.byId, ...v.update }), async (req, res) => {
  res.json({ data: await svc.update(req.valid.params.type, req.valid.params.id, req.valid.body) })
})
taxonomyRouter.delete('/:type/:id', validate(v.byId), async (req, res) => {
  await svc.remove(req.valid.params.type, req.valid.params.id)
  res.status(204).end()
})
