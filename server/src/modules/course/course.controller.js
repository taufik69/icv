import { courseAdminService as admin } from './course.admin.service.js'
import { courseService } from './course.service.js'

// Thin HTTP layer: read validated input from req.valid, call the service, send JSON.
// Express 5 forwards rejected promises to errorHandler, so no try/catch here.
export const courseController = {
  async list(req, res) {
    res.json({ data: await courseService.list(req.valid.query) })
  },

  async finder(req, res) {
    res.json({ data: await courseService.finder() })
  },

  async getPage(req, res) {
    const { market, slug } = req.valid.params
    res.json({ data: await courseService.getPage(market, slug) })
  },
}

export const courseAdminController = {
  async list(req, res) {
    const { items, counts } = await admin.list(req.valid.query)
    res.json({ data: items, meta: { counts } })
  },

  async getById(req, res) {
    res.json({ data: await admin.getById(req.valid.params.id) })
  },

  async getByPage(req, res) {
    const { market, slug } = req.valid.params
    res.json({ data: await admin.getByPage(market, slug) })
  },

  async create(req, res) {
    res.status(201).json({ data: await admin.create(req.valid.body) })
  },

  async update(req, res) {
    res.json({ data: await admin.update(req.valid.params.id, req.valid.body) })
  },

  async setStatus(req, res) {
    res.json({ data: await admin.setStatus(req.valid.params.id, req.valid.body.status) })
  },

  async archive(req, res) {
    await admin.archive(req.valid.params.id)
    res.status(204).end()
  },
}
