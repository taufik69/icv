import { Router } from 'express'
import mongoose from 'mongoose'

const DB_STATES = ['disconnected', 'connected', 'connecting', 'disconnecting']

export const healthRouter = Router()

healthRouter.get('/', (req, res) => {
  res.json({ status: 'ok', db: DB_STATES[mongoose.connection.readyState] ?? 'unknown' })
})
