import mongoose from 'mongoose'
import { env } from '../../config/env.js'
import { ApiError } from '../utils/ApiError.js'

// Normalise known error types into ApiError, then send one JSON shape: { error: { message, details? } }.
function toApiError(err) {
  if (err instanceof ApiError) return err
  if (err instanceof mongoose.Error.ValidationError) {
    const details = Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, v.message]))
    return ApiError.badRequest('Validation failed', details)
  }
  if (err instanceof mongoose.Error.CastError) return ApiError.badRequest(`Invalid ${err.path}`)
  if (err?.code === 11000) return ApiError.conflict(`Duplicate value: ${JSON.stringify(err.keyValue)}`)
  if (err?.type === 'entity.parse.failed') return ApiError.badRequest('Malformed JSON body')
  return new ApiError(500, 'Internal server error')
}

export function errorHandler(err, req, res, _next) {
  const apiError = toApiError(err)
  if (apiError.status >= 500) console.error(err)

  res.status(apiError.status).json({
    error: {
      message: apiError.message,
      ...(apiError.details && { details: apiError.details }),
      ...(!env.isProd && apiError.status >= 500 && { stack: err.stack }),
    },
  })
}
