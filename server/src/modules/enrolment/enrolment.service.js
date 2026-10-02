import { randomInt } from 'node:crypto'
import { Types } from 'mongoose'
import { ApiError } from '../../shared/utils/ApiError.js'
import { ATTACHMENT_TYPES } from './enrolment.constants.js'
import { attachmentField, filePath, removeStoredFiles, storeFiles } from './enrolment.files.js'
import { Enrolment } from './enrolment.model.js'

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no 0/O, 1/I: easy to read out on the phone
const newReference = () => `ENR-${new Date().getFullYear()}-${Array.from({ length: 6 }, () => LETTERS[randomInt(LETTERS.length)]).join('')}`

// API shape: `id` instead of `_id`, `submittedAt` from createdAt.
const toDto = ({ _id, __v, createdAt, updatedAt, ...rest }) => ({ id: String(_id), submittedAt: createdAt, updatedAt, ...rest })

// Short row for the staff list.
const LIST_FIELDS = 'reference status createdAt updatedAt course.code course.title course.intakeYear personal.title personal.givenNames personal.lastName personal.nationality contact.email contact.mobile marketing.heard agent.company'

// Every attachment the student ticked, with the files sent for it. Files for an unticked document are refused.
function buildAttachments(ticked, stored) {
  const sentKeys = ATTACHMENT_TYPES.filter((t) => stored[attachmentField(t.key)]).map((t) => t.key)
  const stray = sentKeys.filter((k) => !ticked.some((a) => a.key === k))
  if (stray.length) throw ApiError.badRequest('Files sent for documents that are not ticked', Object.fromEntries(stray.map((k) => [attachmentField(k), ['add it to "attachments" too']])))
  return ticked.map((a) => ({ ...a, label: ATTACHMENT_TYPES.find((t) => t.key === a.key).label, files: stored[attachmentField(a.key)] ?? [] }))
}

export const enrolmentService = {
  async create(data, files) {
    if (!files?.signature?.length) throw ApiError.badRequest('Invalid body', { signature: ['upload an image of the signature'] })
    const _id = new Types.ObjectId()
    try {
      const stored = await storeFiles(_id, files)
      const doc = {
        _id, ...data,
        agent: { ...data.agent, stamp: stored.agentStamp?.[0] ?? null },
        attachments: buildAttachments(data.attachments, stored),
        declaration: { ...data.declaration, signature: stored.signature[0] },
      }
      for (let tries = 0; ; tries++) {
        try {
          const saved = await Enrolment.create({ ...doc, reference: newReference() })
          return { id: String(saved._id), reference: saved.reference, status: saved.status, submittedAt: saved.createdAt }
        } catch (err) {
          if (err?.code !== 11000 || tries >= 4) throw err // retry only a clashing reference
        }
      }
    } catch (err) {
      await removeStoredFiles(_id)
      throw err
    }
  },

  async list({ status, q, page = 1, limit = 25 } = {}) {
    const filter = { ...(status && { status }) }
    if (q) {
      const rx = new RegExp(escapeRegex(q), 'i')
      filter.$or = ['reference', 'personal.givenNames', 'personal.lastName', 'personal.passportNumber', 'contact.email', 'course.code', 'course.title', 'agent.company'].map((f) => ({ [f]: rx }))
    }
    const [items, total, counts] = await Promise.all([
      Enrolment.find(filter, LIST_FIELDS).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Enrolment.countDocuments(filter),
      this.counts(),
    ])
    return { items: items.map(toDto), meta: { total, page, limit, pages: Math.ceil(total / limit), counts } }
  },

  // Enrolments per status, for dashboard tabs and badges.
  async counts() {
    const rows = await Enrolment.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])
    return Object.fromEntries(rows.map((r) => [r._id, r.count]))
  },

  async getById(id) {
    const doc = await Enrolment.findById(id).lean()
    if (!doc) throw ApiError.notFound('Enrolment not found')
    return toDto(doc)
  },

  async update(id, changes) {
    const doc = await Enrolment.findByIdAndUpdate(id, changes, { new: true, runValidators: true }).lean()
    if (!doc) throw ApiError.notFound('Enrolment not found')
    return toDto(doc)
  },

  async remove(id) {
    const doc = await Enrolment.findByIdAndDelete(id).lean()
    if (!doc) throw ApiError.notFound('Enrolment not found')
    await removeStoredFiles(id)
  },

  // One uploaded file (signature, agent's stamp or an attachment) → { path, name, mimeType }.
  async getFile(id, fileId) {
    const doc = await Enrolment.findById(id, 'declaration.signature agent.stamp attachments.files').lean()
    if (!doc) throw ApiError.notFound('Enrolment not found')
    const all = [doc.declaration?.signature, doc.agent?.stamp, ...(doc.attachments ?? []).flatMap((a) => a.files)].filter(Boolean)
    const file = all.find((f) => f.id === fileId)
    if (!file) throw ApiError.notFound('File not found')
    return { path: filePath(id, file.id), name: file.name, mimeType: file.mimeType }
  },
}
