import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { jwtManager } from '@utils/JWTManager.js'
import http, { Server as HttpServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

config({ path: process.cwd() + '/../.env' })

export const app: Express = express()
app.use(cors())

const server: HttpServer = http.createServer(app)

export const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: '*'
  }
})

app.use(express.json())

const PORT: number = Number(process.env.MONITORING_PORT) || 4000

app.use((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token: string = (authHeader && authHeader.split(' ')[1]) || ''
  if (token === process.env.DEV_API_KEY) return next()
  if (token === undefined || token === '') return res.status(403).send({ error: 'No authentication token' })
  else {
    console.log('Authentication token: ' + token)
    jwtManager.authenticate(req, res, next)
  }
})

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, async (): Promise<void> => {
    console.log(`Monitoring server listening on ${process.env.MONITORING_PORT}`)
    //TODO: here or where we want we have to trigger the broker client to start consuming and sending to the user the measurements
  })
}
