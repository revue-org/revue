import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { config } from 'dotenv'
import { mongoConnect } from '@utils/connection.js'
import { jwtManager } from './utils/JWTManager.js'
import http, { Server as HttpServer } from 'http'
import { anomalyRouter } from '@/infrastructure/api/routes/anomalies.js'
import { measurementRouter } from '@/infrastructure/api/routes/measurements.js'

config({ path: process.cwd() + '/../.env' })

export const app: Express = express()
app.use(cors())

const server: HttpServer = http.createServer(app)

app.use(express.json())

const PORT: number = Number(process.env.LOG_PORT)

app.use((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (token === process.env.DEV_API_KEY) return next()
  if (token === undefined) return res.status(403).send({ error: 'No authentication token' })
  else {
    jwtManager.authenticate(req, res, next)
  }
})

app.use('/measurements', measurementRouter)
app.use('/anomalies', anomalyRouter)

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, async (): Promise<void> => {
    console.log(`Log server listening on ${process.env.LOG_PORT}`)
    await mongoConnect(mongoose, "log")
  })
}
