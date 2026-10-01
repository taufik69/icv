import { copyFile, mkdir } from 'node:fs/promises'
import { basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { env } from '../../config/env.js'
import { UPLOAD_ROOT } from '../../modules/upload/upload.constants.js'

// Copies a course's photos from the client's public/ folder into the server's uploads (where dashboard
// uploads go too) and points the image objects at the server. Already-absolute URLs are left alone.
const CLIENT_PUBLIC = fileURLToPath(new URL('../../../../client/public/', import.meta.url))
const FOLDER = 'courses'

async function copyOne(path) {
  if (!path.startsWith('/')) return path
  const name = basename(path)
  await copyFile(join(CLIENT_PUBLIC, path), join(UPLOAD_ROOT, FOLDER, name))
  return `${env.publicUrl}/uploads/${FOLDER}/${name}`
}

async function moveImage(img) {
  if (!img?.src) return img
  const srcSet = img.srcSet
    ? (await Promise.all(img.srcSet.split(',').map(async (entry) => {
        const [path, size] = entry.trim().split(/\s+/)
        return `${await copyOne(path)} ${size}`
      }))).join(', ')
    : undefined
  return { ...img, src: await copyOne(img.src), srcSet }
}

export async function copyCourseImages(images = {}) {
  await mkdir(join(UPLOAD_ROOT, FOLDER), { recursive: true })
  const entries = await Promise.all(Object.entries(images).map(async ([slot, img]) => [slot, await moveImage(img)]))
  return Object.fromEntries(entries)
}
