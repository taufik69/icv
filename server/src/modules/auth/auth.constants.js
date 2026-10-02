// Staff sign-in and password reset settings.
export const SESSION_COOKIE = 'icv_session'
export const SESSION_DAYS = 7
export const OTP_DIGITS = 6
export const OTP_TTL_MS = 5 * 60 * 1000 // a code lives 5 minutes; a new one can be asked for after that
export const OTP_MAX_ATTEMPTS = 5
export const RESET_TOKEN_MINUTES = 10 // time to choose a new password after the code is accepted
export const LOGIN_MAX_FAILS = 5
export const LOGIN_LOCK_MS = 15 * 60 * 1000
export const PASSWORD_MIN = 10
// Background mail: first try + 3 retries, waiting 2s, 4s, 8s between them.
export const MAIL_RETRIES = 3
export const MAIL_BACKOFF_MS = 2000
