import { model, Schema } from 'mongoose'

// A staff account. Only hashes are stored: the password (scrypt) and the current reset code (HMAC).
// `passwordChangedAt` ends older sessions and reset tokens when the password changes.
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ['admin', 'staff'], default: 'staff' },
    passwordHash: { type: String, required: true, select: false },
    passwordChangedAt: { type: Date, default: Date.now },
    failedLogins: { type: Number, default: 0 },
    lockedUntil: { type: Date, default: null },
    resetCode: {
      type: new Schema({ hash: String, expiresAt: Date, attempts: { type: Number, default: 0 } }, { _id: false }),
      default: null,
      select: false,
    },
  },
  { timestamps: true },
)

export const User = model('User', userSchema)

// What the API shows about a user.
export const toUserDto = (u) => ({ id: String(u._id), email: u.email, name: u.name, role: u.role })
