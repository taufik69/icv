import { Router } from 'express'
import { validate } from '../../shared/middleware/validate.js'
import { authController as c } from './auth.controller.js'
import { requireAuth } from './auth.middleware.js'
import { authValidation as v } from './auth.validation.js'

// Staff sign-in and password reset (email → 6-digit code → new password).
export const authRouter = Router()

authRouter.post('/login', validate(v.login), c.login)
authRouter.post('/logout', c.logout)
authRouter.get('/me', requireAuth, c.me)
authRouter.post('/forgot-password', validate(v.forgot), c.forgot)
authRouter.post('/verify-code', validate(v.verify), c.verify)
authRouter.post('/reset-password', validate(v.reset), c.reset)
