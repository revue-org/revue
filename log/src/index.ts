import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import { mongoConnect } from '@utils/connection.js'
import cors from 'cors'
import { config } from 'dotenv'
import { environmentDataRouter } from './routes/environmentData.js'
import { sensorRouter } from './routes/sensor.js'
import { jwtManager } from './utils/JWTManager.js'
import http, { Server as HttpServer } from 'http'
import { setupConsumers } from './consumer.js'
import mongoose from 'mongoose'

config({ path: process.cwd() + '/../.env' })

export const app: Express = express()
app.use(cors())

const server: HttpServer = http.createServer(app)

app.use(express.json())

const PORT: number = Number(process.env.LOG_PORT) || 4000

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

app.use('/environment-data', environmentDataRouter)
app.use('/sensors', sensorRouter)

const username: string = process.env.LOG_DB_USERNAME || 'admin'
const password: string = process.env.LOG_DB_PASSWORD || 'admin'
const host: string = process.env.NODE_ENV === 'develop' ? 'localhost' : process.env.LOG_DB_HOST || 'localhost'
const dbPort: string =
  process.env.NODE_ENV === 'develop'
    ? process.env.LOG_DB_PORT || '27017'
    : process.env.DEFAULT_DB_PORT || '27017'
const dbName: string = process.env.LOG_DB_NAME || 'log'

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, async (): Promise<void> => {
    console.log(`Log server listening on ${process.env.LOG_PORT}`)
    await mongoConnect(mongoose, username, password, host, dbPort, dbName)
    await setupConsumers()
  })
}
