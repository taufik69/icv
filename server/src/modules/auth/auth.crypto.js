import { createHmac, randomBytes, randomInt, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { env } from '../../config/env.js'
import { OTP_DIGITS } from './auth.constants.js'

const scryptAsync = promisify(scrypt)
const KEYLEN = 64

// "scrypt$<salt hex>$<hash hex>" — a fresh salt per password.
export async function hashPassword(password) {
  const salt = randomBytes(16)
  const hash = await scryptAsync(password, salt, KEYLEN)
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`
}

export async function verifyPassword(password, stored) {
  const [scheme, saltHex, hashHex] = String(stored).split('$')
  if (scheme !== 'scrypt' || !saltHex || !hashHex) return false
  const expected = Buffer.from(hashHex, 'hex')
  const actual = await scryptAsync(password, Buffer.from(saltHex, 'hex'), expected.length)
  return timingSafeEqual(actual, expected)
}

// A 6-digit code ("004719"), uniformly random.
export const newOtp = () => String(randomInt(0, 10 ** OTP_DIGITS)).padStart(OTP_DIGITS, '0')

// Codes are stored only as a keyed hash, tied to the account's email.
export const hashOtp = (email, code) => createHmac('sha256', env.JWT_SECRET).update(`${email}:${code}`).digest('hex')

export function sameHash(a, b) {
  const x = Buffer.from(String(a))
  const y = Buffer.from(String(b))
  return x.length === y.length && timingSafeEqual(x, y)
}
