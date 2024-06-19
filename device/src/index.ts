import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import { mongoConnect } from '@common/utils/connection.js'
import HttpStatusCode from '@common/utils/HttpStatusCode.js'
import { jwtManager } from '@common/utils/jwtManager.js'
import { deviceRouter } from '@/infrastructure/api/routes/devices'

config({ path: process.cwd() + '/../.env' })

export const app: Express = express()

app.use(express.json())
app.use(cors())

const PORT: number = Number(process.env.DEVICE_PORT) || 4000

app.use((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token === process.env.DEV_API_KEY) return next()
  if (token === undefined)
    return res.status(HttpStatusCode.FORBIDDEN).send({ error: 'No authentication token' })
  else {
    console.log('Authentication token: ' + token)
    jwtManager.authenticate(req, res, next)
  }
})

app.use('/', deviceRouter)

const username: string = process.env.DEVICE_DB_USERNAME || 'admin'
const password: string = process.env.DEVICE_DB_PASSWORD || 'admin'
const host: string =
  process.env.NODE_ENV === 'develop' ? 'localhost' : process.env.DEVICE_DB_HOST || 'localhost'
const dbPort: string =
  process.env.NODE_ENV === 'develop'
    ? process.env.DEVICE_DB_PORT || '27017'
    : process.env.DEFAULT_DB_PORT || '27017'
const dbName: string = process.env.DEVICE_DB_NAME || 'device'

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async (): Promise<void> => {
    console.log(`Device server listening on port ${PORT}`)
    await mongoConnect(mongoose, username, password, host, dbPort, dbName)
  })
}
