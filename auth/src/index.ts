import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import { mongoConnect } from '@utils/connection.js'
import { userAccess } from '@/infrastructure/api/users/userAccess.js'
import { userRegistry } from '@/infrastructure/api/users/userRegistry.js'
import { userPermission } from '@/infrastructure/api/users/userPermission.js'
import { jwtManager } from './utils/JWTManager.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

config({ path: process.cwd() + '/../.env' })

export const app: Express = express()

app.use(express.json())
app.use(cors())

const PORT: number = Number(process.env.AUTH_PORT) || 4000

app.use((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token === process.env.DEV_API_KEY) return next()
  if ((req.url === '/login' || req.url === '/newToken') && req.method === 'POST') {
    return next()
  }
  if (token === undefined)
    return res.status(HttpStatusCode.FORBIDDEN).send({ error: 'No authentication token' })
  else {
    console.log('Authentication token: ' + token)
    jwtManager.authenticate(req, res, next)
  }
})

app.use('/', userAccess)
app.use('/users', userRegistry)
app.use('/permissions', userPermission)

const username: string = process.env.AUTH_DB_USERNAME || 'admin'
const password: string = process.env.AUTH_DB_PASSWORD || 'admin'
const host: string =
  process.env.NODE_ENV === 'develop' ? 'localhost' : process.env.AUTH_DB_HOST || 'localhost'
const dbPort: string =
  process.env.NODE_ENV === 'develop'
    ? process.env.AUTH_DB_PORT || '27017'
    : process.env.DEFAULT_DB_PORT || '27017'
const dbName: string = process.env.AUTH_DB_NAME || 'auth'

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async (): Promise<void> => {
    console.log(`Auth server listening on port ${PORT}`)
    await mongoConnect(mongoose, username, password, host, dbPort, dbName)
  })
}
