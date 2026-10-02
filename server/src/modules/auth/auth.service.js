import { ApiError } from '../../shared/utils/ApiError.js'
import { LOGIN_LOCK_MS, LOGIN_MAX_FAILS, OTP_MAX_ATTEMPTS, OTP_TTL_MS } from './auth.constants.js'
import { hashOtp, hashPassword, newOtp, sameHash, verifyPassword } from './auth.crypto.js'
import { resetCodeEmail } from './auth.emails.js'
import { queueMail } from './auth.mailer.js'
import { toUserDto, User } from './auth.model.js'
import { readReset, signReset, signSession, tokenMatchesUser } from './auth.token.js'

const WRONG_LOGIN = 'Email or password is incorrect.'
const minutesLeft = (until) => Math.max(1, Math.ceil((until - Date.now()) / 60_000))

export const authService = {
  // Checks the password; 5 wrong tries lock the account for 15 minutes. Same message for an unknown
  // email and a wrong password, so the form can't be used to find accounts.
  async login(email, password) {
    const user = await User.findOne({ email }).select('+passwordHash')
    if (user?.lockedUntil > Date.now()) throw new ApiError(429, `Too many failed attempts. Try again in ${minutesLeft(user.lockedUntil)} minutes.`)
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      if (user) {
        user.failedLogins += 1
        if (user.failedLogins >= LOGIN_MAX_FAILS) Object.assign(user, { failedLogins: 0, lockedUntil: new Date(Date.now() + LOGIN_LOCK_MS) })
        await user.save()
      }
      throw new ApiError(401, WRONG_LOGIN)
    }
    Object.assign(user, { failedLogins: 0, lockedUntil: null })
    await user.save()
    return { user: toUserDto(user), token: signSession(user) }
  },

  // Emails a 6-digit code that works for 5 minutes. While a code is still valid no new one is sent
  // (the countdown shows when another can be asked for). Unknown emails get the same answer.
  async forgotPassword(email) {
    const user = await User.findOne({ email }).select('+resetCode')
    if (!user) return { expiresAt: new Date(Date.now() + OTP_TTL_MS) }
    if (user.resetCode?.expiresAt > Date.now()) return { expiresAt: user.resetCode.expiresAt }

    const code = newOtp()
    const expiresAt = new Date(Date.now() + OTP_TTL_MS)
    user.resetCode = { hash: hashOtp(user.email, code), expiresAt, attempts: 0 }
    await user.save()
    queueMail(resetCodeEmail({ to: user.email, name: user.name, code, minutes: OTP_TTL_MS / 60_000 }), `Reset code: ${code}`)
    return { expiresAt }
  },

  // Accepts a code once. 5 wrong tries cancel it. Returns a short-lived token for choosing the new password.
  async verifyCode(email, code) {
    const user = await User.findOne({ email }).select('+resetCode')
    const reset = user?.resetCode
    if (!reset || reset.expiresAt <= Date.now()) throw ApiError.badRequest('This code has expired or was already used. Ask for a new one.')
    if (!sameHash(reset.hash, hashOtp(user.email, code))) {
      reset.attempts += 1
      const left = OTP_MAX_ATTEMPTS - reset.attempts
      if (left <= 0) user.resetCode = null
      await user.save()
      throw ApiError.badRequest(left > 0 ? `That code isn't right. ${left} ${left === 1 ? 'try' : 'tries'} left.` : 'Too many wrong codes. Ask for a new one.')
    }
    user.resetCode = null
    await user.save()
    return { resetToken: signReset(user) }
  },

  // Sets the new password; every older session and reset token stops working.
  async resetPassword(resetToken, password) {
    const data = readReset(resetToken)
    const user = data && (await User.findById(data.sub))
    if (!user || !tokenMatchesUser(data, user)) throw ApiError.badRequest('This reset link has expired. Start again.')
    const changed = await User.findById(user._id).select('+passwordHash')
    Object.assign(changed, { passwordHash: await hashPassword(password), passwordChangedAt: new Date(), failedLogins: 0, lockedUntil: null })
    await changed.save()
  },
}
