import { enrolmentService } from './enrolment.service.js'

// Thin HTTP layer over enrolmentService; errors bubble to errorHandler (Express 5).
export const enrolmentController = {
  async create(req, res) {
    res.status(201).json({ data: await enrolmentService.create(req.valid.body, req.files) })
  },

  async list(req, res) {
    const { items, meta } = await enrolmentService.list(req.valid.query)
    res.json({ data: items, meta })
  },

  async counts(req, res) {
    res.json({ data: await enrolmentService.counts() })
  },

  async getById(req, res) {
    res.json({ data: await enrolmentService.getById(req.valid.params.id) })
  },

  async update(req, res) {
    res.json({ data: await enrolmentService.update(req.valid.params.id, req.valid.body) })
  },

  async remove(req, res) {
    await enrolmentService.remove(req.valid.params.id)
    res.status(204).end()
  },

  // Opens in the browser (inline) under the student's original file name.
  async file(req, res) {
    const { path, name, mimeType } = await enrolmentService.getFile(req.valid.params.id, req.valid.params.fileId)
    res.type(mimeType)
    res.set('Content-Disposition', `inline; filename*=UTF-8''${encodeURIComponent(name)}`)
    res.set('Cache-Control', 'private, no-store')
    res.sendFile(path)
  },
}
