import { model, Schema } from 'mongoose'
import { TAXONOMY_TYPES } from './taxonomy.constants.js'

// One item of a course classification list (a study area or a level). Courses store the `key`, so it never
// changes once created; the `label` can be renamed freely.
const taxonomySchema = new Schema(
  {
    type: { type: String, enum: Object.keys(TAXONOMY_TYPES), required: true },
    key: { type: String, required: true, trim: true, maxlength: 60 },
    label: { type: String, required: true, trim: true, maxlength: 80 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
)

taxonomySchema.index({ type: 1, key: 1 }, { unique: true })
taxonomySchema.index({ type: 1, order: 1 })

export const Taxonomy = model('Taxonomy', taxonomySchema)
