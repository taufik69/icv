import { randomBytes } from 'node:crypto'
import { copyFile, mkdir, open, rm, unlink } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import multer from 'multer'
import { ApiError } from '../../shared/utils/ApiError.js'
import { ATTACHMENT_KEYS, FILE_MAX_BYTES, FILE_TYPES, FILES_PER_DOCUMENT, IMAGE_MAX_BYTES, STORAGE_ROOT } from './enrolment.constants.js'

// Multipart handling for POST /enrolments. Files land in a temp folder first; only after the answers
// pass validation are they moved into private storage (storage/enrolments/<enrolment id>/).
const TEMP = join(tmpdir(), 'icv-enrolment-uploads')
const IMAGE_FIELDS = ['signature', 'agentStamp']
export const attachmentField = (key) => `attachment_${key}`

const fields = [
  ...IMAGE_FIELDS.map((name) => ({ name, maxCount: 1 })),
  ...ATTACHMENT_KEYS.map((key) => ({ name: attachmentField(key), maxCount: FILES_PER_DOCUMENT })),
]

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => mkdir(TEMP, { recursive: true }).then(() => cb(null, TEMP), cb),
    filename: (req, file, cb) => cb(null, randomBytes(12).toString('hex')),
  }),
  limits: { fileSize: FILE_MAX_BYTES, files: fields.reduce((n, f) => n + f.maxCount, 0), fields: 1, fieldSize: 512 * 1024 },
  fileFilter: (req, file, cb) => {
    const image = IMAGE_FIELDS.includes(file.fieldname)
    const ok = image ? ['image/jpeg', 'image/png'].includes(file.mimetype) : file.mimetype in FILE_TYPES
    cb(ok ? null : ApiError.badRequest(`${file.fieldname}: use ${image ? 'a JPG or PNG image' : 'PDF, JPG or PNG files'}`), ok)
  },
}).fields(fields)

const MULTER_MESSAGES = {
  LIMIT_FILE_SIZE: 'A file is too large (max 10 MB each)',
  LIMIT_FILE_COUNT: 'Too many files',
  LIMIT_UNEXPECTED_FILE: 'Unexpected file field',
  LIMIT_FIELD_VALUE: 'The "data" field is too large',
}

const allFiles = (req) => Object.values(req.files ?? {}).flat()

// Runs multer, turns its errors into 400s, and always deletes whatever is left in temp once the response is sent.
export function receiveFiles(req, res, next) {
  res.on('close', () => allFiles(req).forEach((f) => unlink(f.path).catch(() => {})))
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return next(ApiError.badRequest(MULTER_MESSAGES[err.code] ?? `Upload failed: ${err.message}`, err.field && { [err.field]: [err.code] }))
    }
    next(err)
  })
}

// The answers arrive as JSON text in the multipart field "data".
export function parseData(req, res, next) {
  try {
    req.body = JSON.parse(req.body?.data ?? '')
    next()
  } catch {
    next(ApiError.badRequest('Send the answers as JSON in the multipart field "data"'))
  }
}

// The declared type must match the file's first bytes (a renamed .exe is refused).
const MAGIC = { 'application/pdf': [0x25, 0x50, 0x44, 0x46], 'image/png': [0x89, 0x50, 0x4e, 0x47], 'image/jpeg': [0xff, 0xd8, 0xff] }
async function checkContent(file) {
  const handle = await open(file.path)
  const { buffer } = await handle.read(Buffer.alloc(4), 0, 4, 0).finally(() => handle.close())
  if (!MAGIC[file.mimetype].every((byte, i) => buffer[i] === byte)) {
    throw ApiError.badRequest(`${file.originalname} is not a real ${FILE_TYPES[file.mimetype].toUpperCase()} file`)
  }
  if (IMAGE_FIELDS.includes(file.fieldname) && file.size > IMAGE_MAX_BYTES) throw ApiError.badRequest(`${file.fieldname}: image is too large (max 2 MB)`)
}

// Checks every file, then copies them into storage/enrolments/<id>/ and returns { fieldname: [file refs] }.
export async function storeFiles(enrolmentId, files = {}) {
  const list = Object.values(files).flat()
  await Promise.all(list.map(checkContent))
  const dir = join(STORAGE_ROOT, String(enrolmentId))
  await mkdir(dir, { recursive: true })
  const stored = {}
  for (const f of list) {
    const id = `${randomBytes(6).toString('hex')}.${FILE_TYPES[f.mimetype]}`
    await copyFile(f.path, join(dir, id))
    ;(stored[f.fieldname] ??= []).push({ id, name: f.originalname.slice(0, 200), mimeType: f.mimetype, size: f.size })
  }
  return stored
}

export const filePath = (enrolmentId, fileId) => join(STORAGE_ROOT, String(enrolmentId), fileId)
export const removeStoredFiles = (enrolmentId) => rm(join(STORAGE_ROOT, String(enrolmentId)), { recursive: true, force: true })
