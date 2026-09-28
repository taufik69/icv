import { Schema } from 'mongoose'

// Reusable pieces of the course document. "parts" is the rich-copy array the frontend renders with
// common/Parts: string | { list } | { chips } | { heading } | { sep } | { more, label }. It stays Mixed.
const opts = { _id: false }
const Parts = { type: [Schema.Types.Mixed], default: undefined }

export const imageSchema = new Schema(
  { src: { type: String, required: true }, srcSet: String, width: Number, height: Number, alt: { type: String, default: '' } },
  opts,
)

export const actionSchema = new Schema({ label: { type: String, required: true }, href: { type: String, required: true } }, opts)

export const glanceSchema = new Schema({ label: { type: String, required: true }, value: { type: String, required: true } }, opts)

export const blockSchema = new Schema({ title: String, parts: Parts }, opts)

export const rplSectionSchema = new Schema({ title: String, collapsible: Boolean, parts: Parts }, opts)

export const unitSchema = new Schema({ code: { type: String, required: true }, title: { type: String, required: true }, href: String }, opts)

export const unitsSchema = new Schema(
  {
    title: String,
    parts: Parts,
    note: String,
    coreLabel: String,
    electiveLabel: String,
    core: { type: [unitSchema], default: undefined },
    elective: { type: [unitSchema], default: undefined },
    table: Schema.Types.Mixed, // table mode (e.g. BSB80120)
  },
  opts,
)

export const criteriaSchema = new Schema(
  {
    title: String,
    subtitle: String,
    elements: { type: [new Schema({ title: String, items: [String] }, opts)], default: undefined },
  },
  opts,
)

export const ctaSchema = new Schema(
  { title: String, headline: String, lines: { type: [String], default: undefined }, actions: { type: [actionSchema], default: undefined } },
  opts,
)

export const fundingSchema = new Schema({ title: String, headline: String, lines: { type: [String], default: undefined } }, opts)

export { Parts }
