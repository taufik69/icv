import { model, Schema } from 'mongoose'
import { OPTIONAL_FIELDS, STATUSES, STUDENT_TYPES } from './application.constants.js'

// One submission of the website's apply form. createdAt doubles as "received at".
const optional = Object.fromEntries(OPTIONAL_FIELDS.map((f) => [f, { type: String, trim: true, default: '' }]))

const applicationSchema = new Schema(
  {
    studentType: { type: String, enum: STUDENT_TYPES, required: true },
    firstName: { type: String, required: true, trim: true, maxlength: 80 },
    lastName: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    ...optional,
    status: { type: String, enum: STATUSES, default: 'New' },
  },
  { timestamps: true },
)

applicationSchema.index({ status: 1, createdAt: -1 })
applicationSchema.index({ createdAt: -1 })

export const Application = model('Application', applicationSchema)
