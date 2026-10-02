import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { UPLOAD_ROOT } from './modules/upload/upload.constants.js'
import { env } from './config/env.js'
import { apiRouter } from './routes/index.js'
import { errorHandler } from './shared/middleware/errorHandler.js'
import { notFound } from './shared/middleware/notFound.js'

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  // Images are loaded by the site on another origin, so allow cross-origin reads.
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
  // credentials: the dashboard's session cookie goes with its API calls.
  app.use(cors({ origin: env.corsOrigins, credentials: true }))
  app.use(express.json({ limit: '1mb' }))
  if (!env.isProd) app.use(morgan('dev'))

  // Uploaded files get unique names, so they can be cached for a year.
  app.use('/uploads', express.static(UPLOAD_ROOT, { immutable: true, maxAge: '365d', index: false }))
  app.use('/api/v1', apiRouter)

  app.use(notFound)
  app.use(errorHandler)
  return app
}
