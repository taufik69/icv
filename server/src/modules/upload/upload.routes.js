import { Router } from 'express'
import multer from 'multer'
import { z } from 'zod'
import { validate } from '../../shared/middleware/validate.js'
import { ApiError } from '../../shared/utils/ApiError.js'
import { FOLDERS, IMAGE_TYPES, MAX_BYTES } from './upload.constants.js'
import { saveImage } from './upload.service.js'

// Files are held in memory (max 8 MB) only long enough for sharp to write the WebP versions.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_BYTES, files: 1 },
  fileFilter: (req, file, cb) =>
    IMAGE_TYPES.includes(file.mimetype) ? cb(null, true) : cb(ApiError.badRequest('Use a JPG, PNG, WebP or AVIF image')),
})

// POST /admin/uploads/images?folder=courses  (multipart, field "image"). Staff only (requireAuth on /admin).
export const uploadRouter = Router()

uploadRouter.post(
  '/images',
  upload.single('image'),
  validate({ query: z.object({ folder: z.enum(FOLDERS).default('courses') }) }),
  async (req, res) => {
    if (!req.file) throw ApiError.badRequest('Choose an image to upload')
    res.status(201).json({ data: await saveImage(req.file, req.valid.query.folder) })
  },
)
