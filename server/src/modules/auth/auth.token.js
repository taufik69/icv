import jwt from 'jsonwebtoken'
import { env } from '../../config/env.js'
import { RESET_TOKEN_MINUTES, SESSION_DAYS } from './auth.constants.js'

// Tokens carry `pwd` (when the password last changed), so changing it ends every older session and
// makes a used reset token worthless.
const stamp = (user) => new Date(user.passwordChangedAt ?? 0).getTime()
const sign = (payload, expiresIn) => jwt.sign(payload, env.JWT_SECRET, { algorithm: 'HS256', expiresIn })
const read = (token, purpose) => {
  try {
    const data = jwt.verify(token, env.JWT_SECRET, { algorithms: ['HS256'] })
    return data.purpose === purpose ? data : null
  } catch {
    return null
  }
}

export const signSession = (user) => sign({ sub: String(user._id), pwd: stamp(user), purpose: 'session' }, `${SESSION_DAYS}d`)
export const readSession = (token) => read(token, 'session')
export const signReset = (user) => sign({ sub: String(user._id), pwd: stamp(user), purpose: 'reset' }, `${RESET_TOKEN_MINUTES}m`)
export const readReset = (token) => read(token, 'reset')
export const tokenMatchesUser = (data, user) => data.pwd === stamp(user)
