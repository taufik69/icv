import { randomBytes } from 'node:crypto'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'
import { env } from '../../config/env.js'
import { ApiError } from '../../shared/utils/ApiError.js'
import { UPLOAD_ROOT, WIDTHS } from './upload.constants.js'

// "Site Manager (1).JPG" → "site-manager-1"
const baseName = (name) =>
  name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'image'

// Saves one uploaded image as WebP at several widths and returns the image object courses store:
// { src, srcSet, width, height, alt } with absolute URLs on this server.
export async function saveImage(file, folder) {
  const input = sharp(file.buffer, { failOn: 'error' }).rotate() // apply EXIF orientation
  const meta = await input.metadata().catch(() => {
    throw ApiError.badRequest('That file is not a readable image')
  })
  const original = meta.autoOrient?.width ?? meta.width
  const widths = [...new Set([...WIDTHS.filter((w) => w < original), Math.min(original, WIDTHS.at(-1))])]

  const dir = join(UPLOAD_ROOT, folder)
  await mkdir(dir, { recursive: true })
  const stem = `${baseName(file.originalname)}-${randomBytes(4).toString('hex')}`

  const files = await Promise.all(
    widths.map(async (width) => {
      const name = `${stem}-${width}.webp`
      const info = await input.clone().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(join(dir, name))
      return { url: `${env.publicUrl}/uploads/${folder}/${name}`, width: info.width, height: info.height }
    }),
  )

  const largest = files.at(-1)
  return {
    src: largest.url,
    srcSet: files.length > 1 ? files.map((f) => `${f.url} ${f.width}w`).join(', ') : undefined,
    width: largest.width,
    height: largest.height,
    alt: '',
  }
}
