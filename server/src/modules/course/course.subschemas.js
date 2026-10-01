import { Schema } from 'mongoose'
import { DELIVERY, FEE_KINDS, STUDY_MODES, UNIT_TYPES } from './course.constants.js'

// Reusable pieces of the course document. "Parts" is the rich-copy array the frontend renders with
// common/Parts: string | { list } | { chips } | { heading } | { sep } | { more, label }. Stored as Mixed.
const opts = { _id: false }
const list = (type) => ({ type: [type], default: undefined })
export const Parts = list(Schema.Types.Mixed)

export const imageSchema = new Schema(
  { src: { type: String, required: true }, srcSet: String, width: Number, height: Number, alt: { type: String, default: '' } },
  opts,
)

export const actionSchema = new Schema({ label: { type: String, required: true }, href: { type: String, required: true } }, opts)
export const glanceSchema = new Schema({ label: { type: String, required: true }, value: { type: String, required: true } }, opts)
export const blockSchema = new Schema({ title: String, parts: Parts }, opts)
export const rplSectionSchema = new Schema({ title: String, collapsible: Boolean, parts: Parts }, opts)

export const factsSchema = new Schema(
  {
    durationText: String,
    durationWeeks: { type: Number, min: 0 },
    delivery: { type: String, enum: DELIVERY },
    deliveryText: String,
    studyMode: { type: String, enum: STUDY_MODES },
    campus: { type: String, default: 'Melbourne CBD' },
    intake: { type: String, default: 'Monthly Intake' },
    placementHours: { type: Number, min: 0 },
    cricosCode: String,
  },
  opts,
)

// Money as integer cents; `text` keeps the verbatim wording when the value isn't a plain amount.
export const feeSchema = new Schema(
  {
    kind: { type: String, enum: FEE_KINDS, required: true },
    label: { type: String, required: true },
    amountCents: { type: Number, min: 0, validate: Number.isInteger },
    text: String,
  },
  opts,
)

export const detailSchema = new Schema(
  {
    entryRequirementsHtml: String, // rich text from the dashboard (sanitised); wins over the imported Parts below
    entryRequirements: Parts,
    additionalRequirements: { title: String, items: list(String) },
    pathways: Parts,
    pathwayCodes: list(String),
    careers: list(String),
    guideUrl: String,
    related: list({ type: Schema.Types.ObjectId, ref: 'Course' }),
  },
  opts,
)

const unitItemSchema = new Schema(
  {
    code: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, enum: UNIT_TYPES, required: true },
    typeLabel: String,
    href: String,
    hours: Number,
    selfPacedHours: Number,
  },
  opts,
)

// One unit list for both displays: 'tabs' (core / elective) and 'table' (with hours columns).
export const unitsSchema = new Schema(
  {
    title: String,
    html: String, // packaging rules as rich text from the dashboard (sanitised); wins over `parts`
    parts: Parts,
    note: String,
    display: { type: String, enum: ['tabs', 'table'], default: 'tabs' },
    coreLabel: String,
    electiveLabel: String,
    tableTitle: String,
    columns: list(String),
    items: list(unitItemSchema),
  },
  opts,
)

export const criteriaSchema = new Schema(
  { title: String, subtitle: String, elements: list(new Schema({ title: String, items: [String] }, opts)) },
  opts,
)

export const ctaSchema = new Schema({ title: String, headline: String, lines: list(String), actions: list(actionSchema) }, opts)
export const fundingSchema = new Schema({ title: String, headline: String, lines: list(String) }, opts)

export const placementSchema = new Schema(
  { title: String, lead: String, paragraphs: list(String), listTitle: String, list: list(String), note: String },
  opts,
)

export const seoSchema = new Schema({ metaTitle: String, metaDescription: { type: String, maxlength: 160 }, ogImage: String }, opts)
