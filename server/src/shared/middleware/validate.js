import { z } from 'zod'
import { ApiError } from '../utils/ApiError.js'

// validate({ body, query, params }) — parses each part with its zod schema.
// Parsed values land on req.valid (Express 5 makes req.query read-only).
export function validate(schemas) {
  return (req, res, next) => {
    req.valid = {}
    for (const [part, schema] of Object.entries(schemas)) {
      const result = schema.safeParse(req[part])
      if (!result.success) {
        return next(ApiError.badRequest(`Invalid ${part}`, z.flattenError(result.error).fieldErrors))
      }
      req.valid[part] = result.data
    }
    next()
  }
}
