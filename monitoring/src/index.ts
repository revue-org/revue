import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import { mongoConnect } from 'domain/dist/utils/connection.js'
import cors from 'cors'
import { config } from 'dotenv'
import { jwtManager } from 'common/dist/utils/JWTManager.js'
import http, { Server as HttpServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { setupConsumers } from './consumer.js'
import mongoose from 'mongoose'

config({ path: process.cwd() + '/../.env' })

export const app: Express = express()
app.use(cors())

const server: HttpServer = http.createServer(app)

export const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: '*'
  }
})

io.use(function (socket, next): void {
  if (socket.handshake.query && socket.handshake.query.token) {
    console.log('middleware socket validation: ' + socket.handshake.query.token)
    // if (jwtManager.verify(socket.handshake.query.token as string)) next()
  } else {
    next(new Error('Authentication error'))
  }
})

app.use(express.json())

const PORT: number = Number(process.env.MONITORING_PORT) || 4000

app.use((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = (authHeader && authHeader.split(' ')[1]) || ''

  // if (jwtManager.admittedTokens().includes(token)) return next()
  if (token === undefined || token === '') return res.status(403).send({ error: 'No authentication token' })
  else {
    console.log('Authentication token: ' + token)
    jwtManager.authenticate(req, res, next)
  }
})

// app.use('/devices', deviceRouter)

const username: string = process.env.MONITORING_DB_USERNAME || 'admin'
const password: string = process.env.MONITORING_DB_PASSWORD || 'admin'
const host: string =
  process.env.NODE_ENV === 'develop' ? 'localhost' : process.env.MONITORING_DB_HOST || 'localhost'
const dbPort: string =
  process.env.NODE_ENV === 'develop'
    ? process.env.MONITORING_DB_PORT || '27017'
    : process.env.DEFAULT_DB_PORT || '27017'
const dbName: string = process.env.MONITORING_DB_NAME || 'monitoring'

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, async (): Promise<void> => {
    console.log(`Monitoring server listening on ${process.env.MONITORING_PORT}`)
    await mongoConnect(mongoose, username, password, host, dbPort, dbName)
    await setupConsumers()
  })
}
