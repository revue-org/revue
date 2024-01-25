import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import mongoose from 'mongoose'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { indexRouter } from './routes/index.js'
import { deviceRouter } from './routes/device.js'
import { jwtManager } from './utils/JWTManager.js'
import { config } from 'dotenv'
import { setupConsumers } from './consumer.js'
import http, { Server as HttpServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

const app: Express = express()
const server: HttpServer = http.createServer(app)
export const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})
config()

export const __dirname: string = dirname(fileURLToPath(import.meta.url)) + '/../../'

app.use(express.json())
app.use(express.static(path.join(__dirname, 'client')))

const PORT: number = Number(process.env.MONITORING_PORT) || 3001

app.use((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token !== process.env.DEV_API_KEY) {
    jwtManager.authenticate(req, res, next)
  } else {
    console.log('Develop authentication token: ' + token)
    return next()
  }
})

app.use(indexRouter)
app.use('/device', deviceRouter)

const mongoConnect = async () => {
  const port: string = process.env.MONITORING_DB_PORT || '27017'
  const username: string = process.env.MONITORING_DB_USERNAME || 'admin'
  const password: string = process.env.MONITORING_DB_PASSWORD || 'admin'
  const host: string = process.env.MONITORING_DB_HOST || 'localhost'
  const dbName: string = process.env.MONITORING_DB_NAME || 'monitoring'
  const connectionString: string = `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`
  await mongoose
    .connect(connectionString)
    .then(async () => {
      console.log(`Monitoring server listening on port ${PORT}`)
    })
    .catch((e) => console.log(e))
}

server.listen(PORT, async (): Promise<void> => {
  await mongoConnect()
  setupConsumers()
})
