import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import { mongoConnect } from '@utils/connection.js'
import { anomalyRouter } from './routes/anomaly.js'
import { securityRuleRouter } from './routes/securityRule.js'
import { jwtManager } from './utils/JWTManager.js'
import cors from 'cors'
import http, { Server as HttpServer } from 'http'
import { setupConsumer } from './consumer.js'

config({ path: process.cwd() + '/../.env' })

export const app: Express = express()
app.use(express.json())
app.use(cors())

const PORT: number = Number(process.env.ALARM_PORT) || 4002

const server: HttpServer = http.createServer(app)

app.use((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = (authHeader && authHeader.split(' ')[1]) || ''

  if (jwtManager.admittedTokens().includes(token)) return next()
  if (token === undefined || token === '') return res.status(403).send({ error: 'No authentication token' })
  if (token === undefined) return res.status(403).send({ error: 'No authentication token' })
  else {
    console.log('Authentication token: ' + token)
    jwtManager.authenticate(req, res, next)
  }
})
app.use('/anomalies', anomalyRouter)
app.use('/security-rules', securityRuleRouter)

const username: string = process.env.ALARM_DB_USERNAME || 'admin'
const password: string = process.env.ALARM_DB_PASSWORD || 'admin'
const host: string =
  process.env.NODE_ENV === 'develop' ? 'localhost' : process.env.ALARM_DB_HOST || 'localhost'
const dbPort: string =
  process.env.NODE_ENV === 'develop'
    ? process.env.ALARM_DB_PORT || '27017'
    : process.env.DEFAULT_DB_PORT || '27017'
const dbName: string = process.env.ALARM_DB_NAME || 'alarm'

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, async (): Promise<void> => {
    console.log(`Alarm server listening on port ${PORT}`)
    await mongoConnect(mongoose, username, password, host, dbPort, dbName)
    await setupConsumer()
  })
}
