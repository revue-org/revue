import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import { mongoConnect } from '@utils/connection.js'
import { notificationRouter } from './routes/notification.js'
import { jwtManager } from './utils/JWTManager.js'
import cors from 'cors'
import { Server as SocketIOServer } from 'socket.io'
import http, { Server as HttpServer } from 'http'

config({ path: process.cwd() + '/../.env' })

export const app: Express = express()
app.use(express.json())
app.use(cors())

const PORT: number = Number(process.env.NOTIFICATION_PORT) || 4002

const server: HttpServer = http.createServer(app)

const frontendHost: string = process.env.FRONTEND_HOST || 'localhost'
const frontendPort: string = process.env.FRONTEND_PORT || '8080'
export const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: `http://${frontendHost}:${frontendPort}`
  }
})

io.use(function (socket, next): void {
  if (socket.handshake.query && socket.handshake.query.token) {
    console.log('middleware socket validation: ' + socket.handshake.query.token)
    if (jwtManager.verify(socket.handshake.query.token as string)) next()
  } else {
    next(new Error('Authentication error'))
  }
})

app.use((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = (authHeader && authHeader.split(' ')[1]) || ""

  if (jwtManager.admittedTokens().includes(token)) return next()
  if (token === undefined || token === "") return res.status(403).send({ error: 'No authentication token' })
  else {
    console.log('Authentication token: ' + token)
    jwtManager.authenticate(req, res, next)
  }
})
app.use('/notifications', notificationRouter)

const username: string = process.env.NOTIFICATION_DB_USERNAME || 'admin'
const password: string = process.env.NOTIFICATION_DB_PASSWORD || 'admin'
const host: string =
  process.env.NODE_ENV === 'develop' ? 'localhost' : process.env.NOTIFICATION_DB_HOST || 'localhost'
const dbPort: string =
  process.env.NODE_ENV === 'develop'
    ? process.env.NOTIFICATION_DB_PORT || '27017'
    : process.env.DEFAULT_DB_PORT || '27017'
const dbName: string = process.env.NOTIFICATION_DB_NAME || 'alarm'

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, async (): Promise<void> => {
    console.log(`Notification server listening on port ${PORT}`)
    console.log(username, password, host, dbPort, dbName)
    await mongoConnect(mongoose, username, password, host, dbPort, dbName)
    //await setupNotificationSimulation() TODO: to check!!
  })
}
