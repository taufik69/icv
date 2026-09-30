import { courseService } from './course.service.js'

// Thin HTTP layer: read validated input from req.valid, call the service, send JSON.
// Express 5 forwards rejected promises to errorHandler, so no try/catch here.
export const courseController = {
  async list(req, res) {
    res.json({ data: await courseService.list(req.valid.query) })
  },

  async getBySlug(req, res) {
    const { market, slug } = req.valid.params
    res.json({ data: await courseService.getBySlug(market, slug) })
  },

  async create(req, res) {
    res.status(201).json({ data: await courseService.create(req.valid.body) })
  },

  async update(req, res) {
    res.json({ data: await courseService.update(req.valid.params.id, req.valid.body) })
  },

  async remove(req, res) {
    await courseService.remove(req.valid.params.id)
    res.status(204).end()
  },
}
