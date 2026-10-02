// Creates the admin staff account from ADMIN_EMAIL / ADMIN_PASSWORD in .env. If the account exists it is
// left alone (pass --reset-password to set ADMIN_PASSWORD again).
// Usage: npm run seed:admin [-- --reset-password]
import { connectDb, disconnectDb } from '../config/db.js'
import { env } from '../config/env.js'
import { hashPassword } from '../modules/auth/auth.crypto.js'
import { User } from '../modules/auth/auth.model.js'

if (!env.ADMIN_PASSWORD) {
  console.error('Set ADMIN_PASSWORD (10+ characters) in server/.env first.')
  process.exit(1)
}

await connectDb()
const existing = await User.findOne({ email: env.ADMIN_EMAIL })
if (existing && !process.argv.includes('--reset-password')) {
  console.log(`Skipped: ${env.ADMIN_EMAIL} already exists (use --reset-password to set ADMIN_PASSWORD again).`)
} else if (existing) {
  await User.updateOne({ _id: existing._id }, { passwordHash: await hashPassword(env.ADMIN_PASSWORD), passwordChangedAt: new Date(), failedLogins: 0, lockedUntil: null })
  console.log(`Password reset for ${env.ADMIN_EMAIL}.`)
} else {
  await User.create({ email: env.ADMIN_EMAIL, name: 'ICV Admin', role: 'admin', passwordHash: await hashPassword(env.ADMIN_PASSWORD) })
  console.log(`Created admin ${env.ADMIN_EMAIL}. Sign in at /dashboard/login with ADMIN_PASSWORD from .env.`)
}
await disconnectDb()
