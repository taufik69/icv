import { Schema } from 'mongoose'
import { ATTACHMENT_KEYS, AUSTRALIAN_STATES, COVER_DURATIONS, COVER_TYPES, DISABILITY_TYPES, GENDERS, HEARD_OPTIONS, TITLES } from './enrolment.constants.js'

// Pieces of the enrolment document, one per part of the paper form. Dates are kept as the
// 'YYYY-MM-DD' strings the form sends (no time zone shifts); optional text defaults to ''.
const opts = { _id: false }
const text = { type: String, trim: true, default: '' }
const need = { type: String, trim: true, required: true }
const oneOf = (values, required = false) => ({ type: String, enum: required ? values : [...values, ''], ...(required ? { required } : { default: '' }) })
const sub = (fields) => new Schema(fields, opts)

// A stored upload. `id` (e.g. "3f9c1a7b2d4e.pdf") names it in GET /enrolments/:id/files/:fileId and on
// disk at storage/enrolments/<enrolment id>/<id>; `name` is the student's original file name.
export const fileSchema = new Schema(
  { id: { type: String, required: true }, name: need, mimeType: need, size: { type: Number, required: true } },
  opts,
)

export const courseSchema = sub({
  code: need, title: need, duration: text, applicationFee: text, tuitionFee: text, materialFee: text,
  manual: { type: Boolean, default: false }, intakeYear: need,
})

export const personalSchema = sub({
  title: oneOf(TITLES, true), givenNames: need, lastName: need, gender: oneOf(GENDERS, true), dob: need,
  countryOfBirth: need, nationality: need, firstLanguage: text, passportNumber: need, passportExpiry: need,
})

export const contactSchema = sub({
  home: sub({ address: need, city: need, country: need, postcode: text }),
  australia: sub({ address: text, suburb: text, state: oneOf(AUSTRALIAN_STATES), postcode: text }),
  phone: text, mobile: need, email: { ...need, lowercase: true },
})

export const emergencySchema = sub({ name: need, relationship: need, number: need })

export const healthSchema = sub({
  oshc: sub({ has: { type: Boolean, default: false }, provider: text, membershipNumber: text, type: oneOf(COVER_TYPES), expiry: text }),
  arrangeOshc: sub({ wanted: { type: Boolean, default: false }, duration: oneOf(COVER_DURATIONS), durationOther: text, type: oneOf(COVER_TYPES) }),
  disability: sub({ has: { type: Boolean, required: true }, types: { type: [{ type: String, enum: DISABILITY_TYPES }], default: [] }, otherMedical: text }),
})

const qualificationSchema = sub({ qualification: text, year: text, country: text })
const englishTestSchema = sub({ test: text, date: text, reading: text, writing: text, speaking: text, listening: text, overall: text })

export const educationSchema = sub({
  qualifications: { type: [qualificationSchema], default: [] },
  creditTransfer: { type: Boolean, required: true },
  englishTests: { type: [englishTestSchema], default: [] },
})

export const visaSchema = sub({
  holds: { type: Boolean, required: true }, type: text, subclass: text, expiry: text,
  immigrationOffice: text, applicationDate: text,
})

export const marketingSchema = sub({ heard: oneOf(HEARD_OPTIONS, true), heardOther: text })

export const agentSchema = sub({ company: text, name: text, email: { ...text, lowercase: true }, phone: text, stamp: { type: fileSchema, default: null } })

export const attachmentSchema = sub({
  key: { type: String, enum: ATTACHMENT_KEYS, required: true },
  label: need,
  name: text, // what "Other" is, e.g. "Work experience letter"
  files: { type: [fileSchema], default: [] },
})

export const declarationSchema = sub({ agreed: { type: Boolean, required: true }, signature: { type: fileSchema, required: true }, signedDate: need })
