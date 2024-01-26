import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import mongoose from 'mongoose'
import { deviceRouter } from './routes/device.js'
import { jwtManager } from './utils/JWTManager.js'
import { setupConsumers } from './consumer.js'
import http, { Server as HttpServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { config } from 'dotenv'

config()

const app: Express = express()
const server: HttpServer = http.createServer(app)
export const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:3000'
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
  const port: string = process.env.MONITORING_DB_PORT || '27018'
  const username: string = process.env.MONITORING_DB_USERNAME || 'admin'
  const password: string = process.env.MONITORING_DB_PASSWORD || 'admin'
  const host: string = (process.env.NODE_ENV === 'develop') ? 'localhost' : process.env.MONITORING_DB_HOST || 'localhost'
  const dbName: string = process.env.MONITORING_DB_NAME || 'monitoring'
  const connectionString: string = `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`
  console.log(connectionString)
  await mongoose
    .connect(connectionString)
    .then(async (): Promise<void> => {
      console.log(`Connected to Mongo DB ${dbName} at ${host}`)
    })
    .catch((err): void => {
      console.log(err)
      throw err
    })
}

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, async (): Promise<void> => {
    console.log(`Monitoring server listening on ${process.env.MONITORING_PORT}`)
    await mongoConnect()
    await setupConsumers()
  })
} else {
  server.listen(PORT, async (): Promise<void> => {
    await mongoConnect()
    if (process.env.NODE_ENV !== 'develop') {
      await setupConsumers()
    }
  })
}
