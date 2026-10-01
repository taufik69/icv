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
}
