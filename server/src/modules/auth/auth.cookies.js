import { env } from '../../config/env.js'
import { SESSION_COOKIE, SESSION_DAYS } from './auth.constants.js'

// The session lives in an httpOnly cookie: scripts can't read it, and <img>/<a> requests for private
// files (passports…) carry it automatically. SameSite=Lax stops it riding along on cross-site posts.
const base = { httpOnly: true, sameSite: 'lax', secure: env.isProd, path: '/' }

export const setSessionCookie = (res, token) => res.cookie(SESSION_COOKIE, token, { ...base, maxAge: SESSION_DAYS * 86_400_000 })
export const clearSessionCookie = (res) => res.clearCookie(SESSION_COOKIE, base)

// Reads one cookie from the request header (no cookie-parser needed for a single value).
export function readCookie(req, name = SESSION_COOKIE) {
  for (const part of (req.headers.cookie ?? '').split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return decodeURIComponent(rest.join('='))
  }
  return null
}
