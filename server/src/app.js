import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env.js'
import { apiRouter } from './routes/index.js'
import { errorHandler } from './shared/middleware/errorHandler.js'
import { notFound } from './shared/middleware/notFound.js'

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  app.use(helmet())
  app.use(cors({ origin: env.corsOrigins }))
  app.use(express.json({ limit: '1mb' }))
  if (!env.isProd) app.use(morgan('dev'))

  app.use('/api/v1', apiRouter)

  app.use(notFound)
  app.use(errorHandler)
  return app
}
