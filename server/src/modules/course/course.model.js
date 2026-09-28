import { model, Schema } from 'mongoose'
import { FILTERS, MARKETS } from './course.constants.js'
import {
  actionSchema, blockSchema, criteriaSchema, ctaSchema, fundingSchema,
  glanceSchema, imageSchema, Parts, rplSectionSchema, unitsSchema,
} from './course.subschemas.js'

// One document per course page (/<market>/<slug>). Optional blocks mirror CoursePage: a block renders
// only when present, so leave it unset rather than empty.
const courseSchema = new Schema(
  {
    market: { type: String, enum: MARKETS, required: true },
    slug: { type: String, required: true, trim: true, lowercase: true, match: /^[a-z0-9-]+$/ },
    code: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: String, // display label, e.g. "Building and Construction"
    filter: { type: String, enum: FILTERS }, // landing filter chip id
    summary: String, // course card text
    tagline: String,
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: false },

    images: {
      card: imageSchema, hero: imageSchema, overview: imageSchema, career: imageSchema,
      criteria: imageSchema, units: imageSchema, rpl: imageSchema, cta: imageSchema,
    },
    overview: { paragraphs: { type: [String], default: undefined } },
    actions: { type: [actionSchema], default: undefined },
    glance: { type: [glanceSchema], default: undefined },
    funding: fundingSchema,
    career: blockSchema,
    detailsTitle: String,
    details: { type: [blockSchema], default: undefined },
    criteria: criteriaSchema,
    units: unitsSchema,
    extras: { title: String, blocks: { type: [blockSchema], default: undefined } },
    placement: Schema.Types.Mixed, // { title?, lead?, paragraphs?, listTitle?, list?, note? }
    rpl: { title: String, sections: { type: [rplSectionSchema], default: undefined } },
    employment: { title: String, parts: Parts },
    cta: ctaSchema,
  },
  { timestamps: true, minimize: true },
)

courseSchema.index({ market: 1, slug: 1 }, { unique: true })
courseSchema.index({ market: 1, published: 1, order: 1 })

export const Course = model('Course', courseSchema)
