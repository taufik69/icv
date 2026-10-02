import nodemailer from 'nodemailer'
import { env } from '../../config/env.js'
import { MAIL_BACKOFF_MS, MAIL_RETRIES } from './auth.constants.js'

let transport

const getTransport = () => (transport ??= nodemailer.createTransport({
  host: env.SMTP_HOST, port: env.SMTP_PORT, secure: env.SMTP_PORT === 465,
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
}))
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Sends one message, retrying up to MAIL_RETRIES times (2s, 4s, 8s apart). Resolves to true/false and
// never throws, so a caller can fire it in the background. `send` is swappable for tests.
export async function sendWithRetry(message, { send = (m) => getTransport().sendMail(m), retries = MAIL_RETRIES, backoff = MAIL_BACKOFF_MS, log = console } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      await send({ from: env.MAIL_FROM ?? env.SMTP_USER, ...message })
      return true
    } catch (err) {
      log.warn(`Mail to ${message.to} failed (attempt ${attempt + 1} of ${retries + 1}): ${err.message}`)
      if (attempt < retries) await wait(backoff * 2 ** attempt)
    }
  }
  log.error(`Mail to ${message.to} gave up after ${retries + 1} attempts.`)
  return false
}

// Queues a message without holding up the HTTP response. Without SMTP settings in development, the
// message is printed to the console instead (so the reset flow can be tried locally).
export function queueMail(message, devNote) {
  if (!env.mailConfigured) {
    if (env.isProd) console.error('SMTP is not configured: set SMTP_USER and SMTP_PASS. Mail not sent.')
    else console.log(`\n[mail: SMTP not configured, printing instead]\nTo: ${message.to}\nSubject: ${message.subject}\n${devNote ?? message.text}\n`)
    return
  }
  setImmediate(() => sendWithRetry(message))
}
