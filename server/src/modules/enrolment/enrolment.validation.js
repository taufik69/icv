import { z } from 'zod'
import { ApiError } from '../../shared/utils/ApiError.js'
import {
  ATTACHMENT_KEYS, AUSTRALIAN_STATES, COVER_DURATIONS, COVER_TYPES, DISABILITY_TYPES, GENDERS, HEARD_OPTIONS, STATUSES, TITLES,
} from './enrolment.constants.js'

// Rules match the website form (client/src/features/apply/lib/validateEnrolmentStep.js): the same fields
// are required, and the same follow-up fields become required by the same answers.
const text = (max = 200) => z.string().trim().max(max).optional().default('')
const need = (max = 200) => z.string().trim().min(1, 'required').max(max)
const date = z.iso.date('use YYYY-MM-DD')
const optDate = z.union([z.literal(''), date]).optional().default('')
const blankOr = (values) => z.union([z.literal(''), z.enum(values)]).optional().default('')

const course = z.object({
  code: need(30), title: need(), duration: text(), applicationFee: text(40), tuitionFee: text(40), materialFee: text(40),
  manual: z.boolean().optional().default(false), intakeYear: z.string().regex(/^20\d{2}$/, 'use a year like 2027'),
})

const personal = z.object({
  title: z.enum(TITLES), givenNames: need(80), lastName: need(80), gender: z.enum(GENDERS), dob: date,
  countryOfBirth: need(80), nationality: need(80), firstLanguage: text(80), passportNumber: need(20), passportExpiry: date,
})

const contact = z.object({
  home: z.object({ address: need(300), city: need(80), country: need(80), postcode: text(20) }),
  australia: z.object({ address: text(300), suburb: text(80), state: blankOr(AUSTRALIAN_STATES), postcode: text(10) }).prefault({}),
  phone: text(40), mobile: need(40), email: z.email().max(200),
})

const emergencyContact = z.object({ name: need(120), relationship: need(80), number: need(40) })

const health = z.object({
  oshc: z.object({ has: z.boolean(), provider: text(), membershipNumber: text(80), type: blankOr(COVER_TYPES), expiry: optDate }),
  arrangeOshc: z.object({ wanted: z.boolean(), duration: blankOr(COVER_DURATIONS), durationOther: text(80), type: blankOr(COVER_TYPES) }),
  disability: z.object({ has: z.boolean(), types: z.array(z.enum(DISABILITY_TYPES)).max(4).default([]), otherMedical: text(1000) }),
})

const qualification = z.object({ qualification: text(), year: text(10), country: text(80) })
const score = text(10)
const englishTest = z.object({ test: text(), date: optDate, reading: score, writing: score, speaking: score, listening: score, overall: score })
const education = z.object({
  qualifications: z.array(qualification).max(6).default([]),
  creditTransfer: z.boolean(),
  englishTests: z.array(englishTest).max(6).default([]),
})

const visa = z.object({
  holds: z.boolean(), type: text(), subclass: z.string().trim().regex(/^\d{0,3}$/, 'up to 3 digits').optional().default(''),
  expiry: optDate, immigrationOffice: text(300), applicationDate: optDate,
})

const marketing = z.object({ heard: z.enum(HEARD_OPTIONS), heardOther: text() })
const agent = z.object({ company: text(), name: text(120), email: z.union([z.literal(''), z.email()]).optional().default(''), phone: text(40) }).prefault({})
const attachment = z.object({ key: z.enum(ATTACHMENT_KEYS), name: text(120) })
const declaration = z.object({ agreed: z.literal(true, 'tick the declaration'), signedDate: date })

// Follow-up fields required by an earlier answer, reported on their own path.
const followUps = (d, ctx) => {
  const req = (cond, path, message = 'required') => cond && ctx.addIssue({ code: 'custom', path, message })
  const { oshc, arrangeOshc, disability } = d.health
  req(oshc.has && !oshc.provider, ['health', 'oshc', 'provider'])
  req(oshc.has && !oshc.membershipNumber, ['health', 'oshc', 'membershipNumber'])
  req(arrangeOshc.wanted && !arrangeOshc.duration, ['health', 'arrangeOshc', 'duration'])
  req(arrangeOshc.wanted && !arrangeOshc.type, ['health', 'arrangeOshc', 'type'])
  req(arrangeOshc.wanted && arrangeOshc.duration === 'Other' && !arrangeOshc.durationOther, ['health', 'arrangeOshc', 'durationOther'])
  req(disability.has && !disability.types.length && !disability.otherMedical, ['health', 'disability', 'types'], 'choose one or describe the condition')
  req(d.visa.holds && !d.visa.type, ['visa', 'type'])
  req(d.marketing.heard === 'Agent' && !d.agent.company, ['agent', 'company'])
  req(d.marketing.heard === 'Agent' && !d.agent.name, ['agent', 'name'])
  const keys = d.attachments.map((a) => a.key)
  req(new Set(keys).size !== keys.length, ['attachments'], 'each document once')
}

export const enrolmentBody = z
  .object({ course, personal, contact, emergencyContact, health, education, visa, marketing, agent, attachments: z.array(attachment).max(8).default([]), declaration })
  .superRefine(followUps)

// Like the shared validate(), but error details use full dotted paths ("personal.dob",
// "education.englishTests.0.date") so the form can put each message on its field. Follow-up rules
// (superRefine) run once the basic shape is valid.
export function validateEnrolmentBody(req, res, next) {
  const result = enrolmentBody.safeParse(req.body)
  if (!result.success) {
    const details = {}
    for (const issue of result.error.issues) (details[issue.path.join('.') || 'body'] ??= []).push(issue.message)
    return next(ApiError.badRequest('Invalid body', details))
  }
  req.valid = { body: result.data }
  next()
}

const id = z.string().regex(/^[a-f\d]{24}$/i, 'invalid id')

export const enrolmentValidation = {
  list: {
    query: z.object({
      status: z.enum(STATUSES).optional(),
      q: z.string().trim().max(100).optional(),
      page: z.coerce.number().int().min(1).default(1),
      limit: z.coerce.number().int().min(1).max(100).default(25),
    }),
  },
  byId: { params: z.object({ id }) },
  file: { params: z.object({ id, fileId: z.string().regex(/^[a-f\d]{12}\.(pdf|jpg|png)$/, 'invalid file id') }) },
  update: { body: z.object({ status: z.enum(STATUSES).optional(), staffNote: z.string().trim().max(5000).optional() }).refine((b) => b.status || b.staffNote !== undefined, 'send status and/or staffNote') },
}
