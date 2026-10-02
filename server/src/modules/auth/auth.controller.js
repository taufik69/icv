import { toUserDto } from './auth.model.js'
import { authService } from './auth.service.js'
import { clearSessionCookie, setSessionCookie } from './auth.cookies.js'

// Thin HTTP layer over authService; errors bubble to errorHandler (Express 5).
export const authController = {
  async login(req, res) {
    const { user, token } = await authService.login(req.valid.body.email, req.valid.body.password)
    setSessionCookie(res, token)
    res.json({ data: user })
  },

  async logout(req, res) {
    clearSessionCookie(res)
    res.status(204).end()
  },

  async me(req, res) {
    res.json({ data: toUserDto(req.user) })
  },

  // 202: the email is sent in the background. The same answer whether or not the account exists.
  async forgot(req, res) {
    const { expiresAt } = await authService.forgotPassword(req.valid.body.email)
    res.status(202).json({ data: { expiresAt, message: 'If this email belongs to a staff account, a reset code is on its way.' } })
  },

  async verify(req, res) {
    res.json({ data: await authService.verifyCode(req.valid.body.email, req.valid.body.code) })
  },

  async reset(req, res) {
    await authService.resetPassword(req.valid.body.resetToken, req.valid.body.password)
    clearSessionCookie(res)
    res.json({ data: { message: 'Password changed. Sign in with your new password.' } })
  },
}
