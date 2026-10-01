import { model, Schema } from 'mongoose'
import { LEVELS, MARKETS, STATUSES, STUDY_AREAS } from './course.constants.js'
import {
  actionSchema, blockSchema, criteriaSchema, ctaSchema, detailSchema, factsSchema, feeSchema, fundingSchema,
  glanceSchema, imageSchema, Parts, placementSchema, rplSectionSchema, seoSchema, unitsSchema,
} from './course.subschemas.js'

// One document per course page (/<market>/<slug>). Typed fields (facts, fees, detail) feed the finder and
// the course detail page; the verbatim blocks below them render the icv.edu.au copy. Optional blocks render
// only when present, so leave them unset rather than empty. Spec: .claude/specs/course-model.md
const list = (type) => ({ type: [type], default: undefined })

const courseSchema = new Schema(
  {
    market: { type: String, enum: MARKETS, required: true },
    slug: { type: String, required: true, trim: true, lowercase: true, match: /^[a-z0-9-]+$/ },
    code: { type: String, required: true, trim: true },
    applyCode: { type: String, trim: true },
    title: { type: String, required: true, trim: true },
    level: { type: String, enum: LEVELS, required: true },
    studyArea: { type: String, enum: STUDY_AREAS, required: true },
    category: String,
    status: { type: String, enum: STATUSES, default: 'draft' },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false }, // shown in "Our popular courses" on the home page
    summary: { type: String, maxlength: 300 },
    tagline: String,
    externalUrl: String,
    publishedAt: Date,

    facts: factsSchema,
    fees: list(feeSchema),
    paymentOptions: String,
    detail: detailSchema,
    units: unitsSchema,

    images: {
      card: imageSchema, hero: imageSchema, overview: imageSchema, career: imageSchema,
      criteria: imageSchema, units: imageSchema, rpl: imageSchema, cta: imageSchema,
    },
    // `html` = rich text from the dashboard editor (sanitised on save); `paragraphs` = imported Parts copy.
    overview: { html: String, paragraphs: Parts, list: list(String) },
    actions: list(actionSchema),
    glance: list(glanceSchema),
    funding: fundingSchema,
    career: blockSchema,
    detailsTitle: String,
    details: list(blockSchema),
    criteria: criteriaSchema,
    extras: { title: String, blocks: list(blockSchema) },
    placement: placementSchema,
    rpl: { title: String, sections: list(rplSectionSchema) },
    employment: { title: String, parts: Parts },
    cta: ctaSchema,
    seo: seoSchema,
  },
  { timestamps: true, minimize: true },
)

// First activation stamps publishedAt.
courseSchema.pre('save', function () {
  if (this.status === 'active' && !this.publishedAt) this.publishedAt = new Date()
})

courseSchema.index({ market: 1, slug: 1 }, { unique: true })
courseSchema.index({ market: 1, code: 1 }, { unique: true })
courseSchema.index({ code: 1, status: 1 })
courseSchema.index({ status: 1, market: 1, order: 1 })
courseSchema.index({ status: 1, featured: 1, market: 1, order: 1 })
courseSchema.index({ status: 1, studyArea: 1, level: 1 })
courseSchema.index({ title: 'text', code: 'text', summary: 'text' }, { weights: { title: 10, code: 10, summary: 2 } })

export const Course = model('Course', courseSchema)
