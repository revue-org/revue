import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { config } from 'dotenv'
import { deviceRouter } from './routes/device.js'
import { jwtManager } from './utils/JWTManager.js'
import http, { Server as HttpServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

config()

export const app: Express = express()
app.use(cors())

const server: HttpServer = http.createServer(app)

const frontendPort: string = process.env.FRONTEND_PORT || '8080'
export const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: `http://localhost:${frontendPort}`
  }
})

app.use(express.json())

const PORT: number = Number(process.env.MONITORING_PORT) || 4000

app.use((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token === process.env.DEV_API_KEY) return next()
  if (token === undefined) return res.status(403).send({ error: 'No authentication token' })
  else {
    console.log('Authentication token: ' + token)
    jwtManager.authenticate(req, res, next)
  }
})

app.use('/devices', deviceRouter)

const mongoConnect = async (): Promise<void> => {
  const username: string = process.env.MONITORING_DB_USERNAME || 'admin'
  const password: string = process.env.MONITORING_DB_PASSWORD || 'admin'
  const host: string =
    process.env.NODE_ENV === 'develop' ? 'localhost' : process.env.MONITORING_DB_HOST || 'localhost'
  const dbPort: string =
    process.env.NODE_ENV === 'develop'
      ? process.env.MONITORING_DB_PORT || '27017'
      : process.env.DEFAULT_DB_PORT || '27017'
  const dbName: string = process.env.MONITORING_DB_NAME || 'monitoring'
  const connectionString: string = `mongodb://${username}:${password}@${host}:${dbPort}/${dbName}?authSource=admin`
  console.log(connectionString)
  await mongoose
    .connect(connectionString)
    .then(async (): Promise<void> => {
      console.log(`Connected to Mongo DB ${dbName} at ${host}`)
    })
    .catch((err): void => {
      throw err
    })
}

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, async (): Promise<void> => {
    console.log(`Monitoring server listening on ${process.env.MONITORING_PORT}`)
    await mongoConnect()
  })
}