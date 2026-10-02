import { model, Schema } from 'mongoose'
import { STATUSES } from './enrolment.constants.js'
import {
  agentSchema, attachmentSchema, contactSchema, courseSchema, declarationSchema, educationSchema,
  emergencySchema, healthSchema, marketingSchema, personalSchema, visaSchema,
} from './enrolment.subschemas.js'

// One submitted "Enrolment Application Form – International", grouped by the paper form's parts:
// (A) course, (B) personal, (C) contact, (D) emergencyContact, (E) health, (F, G) education,
// (H, I) visa, (J) marketing, (K) agent, (M) attachments, (N) declaration.
// `reference` (e.g. ENR-2026-7K3QX9) is what the student and staff quote; createdAt = submitted at.
const enrolmentSchema = new Schema(
  {
    reference: { type: String, required: true, unique: true },
    status: { type: String, enum: STATUSES, default: 'New' },
    course: { type: courseSchema, required: true },
    personal: { type: personalSchema, required: true },
    contact: { type: contactSchema, required: true },
    emergencyContact: { type: emergencySchema, required: true },
    health: { type: healthSchema, required: true },
    education: { type: educationSchema, required: true },
    visa: { type: visaSchema, required: true },
    marketing: { type: marketingSchema, required: true },
    agent: { type: agentSchema, default: () => ({}) },
    attachments: { type: [attachmentSchema], default: [] },
    declaration: { type: declarationSchema, required: true },
    staffNote: { type: String, trim: true, default: '', maxlength: 5000 },
  },
  { timestamps: true },
)

enrolmentSchema.index({ status: 1, createdAt: -1 })
enrolmentSchema.index({ createdAt: -1 })

export const Enrolment = model('Enrolment', enrolmentSchema)
