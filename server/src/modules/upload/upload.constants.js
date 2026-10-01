import { fileURLToPath } from 'node:url'

// Uploaded images live in server/public/uploads and are served at /uploads (see app.js).
export const UPLOAD_ROOT = fileURLToPath(new URL('../../../public/uploads/', import.meta.url))
export const MAX_BYTES = 8 * 1024 * 1024
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
// Widths generated for each upload (never wider than the original).
export const WIDTHS = [640, 1280, 1920]
export const FOLDERS = ['courses']
