import { z } from 'zod'

// Load server/.env when present (Node >= 21.7); real env vars always win.
try {
  process.loadEnvFile()
} catch {
  // No .env file — rely on the process environment.
}

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  MONGODB_URI: z.string().min(1),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  // Public address of this server; uploaded image URLs are built from it.
  PUBLIC_URL: z.url().optional(),
  // Staff sign-in. The admin account (npm run seed:admin) uses ADMIN_EMAIL / ADMIN_PASSWORD.
  ADMIN_EMAIL: z.email().default('taufikislam172@gmail.com'),
  ADMIN_PASSWORD: z.string().min(10).optional(),
  // Signs the session cookie; at least 32 random characters.
  JWT_SECRET: z.string().min(32),
  // Outgoing mail (password reset codes). Gmail: smtp.gmail.com / 465 with an App Password.
  SMTP_HOST: z.string().default('smtp.gmail.com'),
  SMTP_PORT: z.coerce.number().int().positive().default(465),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  MAIL_FROM: z.string().optional(),
})

const parsed = schema.safeParse(process.env)
if (!parsed.success) {
  console.error('Invalid environment:', z.flattenError(parsed.error).fieldErrors)
  process.exit(1)
}

export const env = {
  ...parsed.data,
  corsOrigins: parsed.data.CORS_ORIGIN.split(',').map((o) => o.trim()),
  isProd: parsed.data.NODE_ENV === 'production',
  publicUrl: (parsed.data.PUBLIC_URL ?? `http://localhost:${parsed.data.PORT}`).replace(/\/$/, ''),
  mailConfigured: Boolean(parsed.data.SMTP_USER && parsed.data.SMTP_PASS),
}
