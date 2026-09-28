import { createApp } from './app.js'
import { connectDb, disconnectDb } from './config/db.js'
import { env } from './config/env.js'

await connectDb()
const server = createApp().listen(env.PORT, () => {
  console.log(`API listening on http://localhost:${env.PORT}/api/v1`)
})

async function shutdown(signal) {
  console.log(`${signal} received, shutting down`)
  server.close(async () => {
    await disconnectDb()
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
