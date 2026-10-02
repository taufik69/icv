import { z } from 'zod'
import { OTP_DIGITS, PASSWORD_MIN } from './auth.constants.js'

const email = z.email('enter a valid email').trim().toLowerCase()

export const authValidation = {
  login: { body: z.object({ email, password: z.string().min(1, 'enter your password').max(200) }) },
  forgot: { body: z.object({ email }) },
  verify: { body: z.object({ email, code: z.string().trim().regex(new RegExp(`^\\d{${OTP_DIGITS}}$`), `enter the ${OTP_DIGITS}-digit code`) }) },
  reset: {
    body: z.object({
      resetToken: z.string().min(1),
      password: z.string().min(PASSWORD_MIN, `use at least ${PASSWORD_MIN} characters`).max(200),
    }),
  },
}
