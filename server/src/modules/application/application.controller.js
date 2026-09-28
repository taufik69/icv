import { applicationService } from './application.service.js'

// Thin HTTP layer over applicationService; errors bubble to errorHandler (Express 5).
export const applicationController = {
  async create(req, res) {
    res.status(201).json({ data: await applicationService.create(req.valid.body) })
  },

  async list(req, res) {
    const { items, counts } = await applicationService.list(req.valid.query)
    res.json({ data: items, meta: { counts } })
  },

  async getById(req, res) {
    res.json({ data: await applicationService.getById(req.valid.params.id) })
  },

  async update(req, res) {
    res.json({ data: await applicationService.updateStatus(req.valid.params.id, req.valid.body.status) })
  },

  async remove(req, res) {
    await applicationService.remove(req.valid.params.id)
    res.status(204).end()
  },
}
