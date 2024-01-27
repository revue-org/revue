import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'

import { config } from 'dotenv'
import mongoose from 'mongoose'
import { userAccessRouter } from './routes/userAccess.js'
import { userRouter } from './routes/user.js'
import { jwtManager } from './utils/JWTManager.js'
import HttpStatusCode from './utils/HttpStatusCode.js'

export const app: Express = express()
app.use(express.json())

config()

const PORT: number = Number(process.env.PORT) || 4000

app.use((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (token === process.env.DEV_API_KEY) return next()
  if ((req.url === '/login' || req.url === '/newToken') && req.method === 'POST') return next()
  if (token === undefined)
    return res.status(HttpStatusCode.FORBIDDEN).send({ error: 'No authentication token' })
  else {
    console.log('Authentication token: ' + token)
    jwtManager.authenticate(req, res, next)
  }
})

app.use('/', userAccessRouter)
app.use('/users', userRouter)

const mongoConnect = async (): Promise<void> => {
  const username: string = process.env.AUTH_DB_USERNAME || 'admin'
  const password: string = process.env.AUTH_DB_PASSWORD || 'admin'
  const host: string =
    process.env.NODE_ENV === 'develop' ? 'localhost' : process.env.AUTH_DB_HOST || 'localhost'
  const dbName: string = process.env.AUTH_DB_NAME || 'monitoring'
  const connectionString: string = `mongodb://${username}:${password}@${host}:27017/${dbName}?authSource=admin`
  console.log(connectionString)
  await mongoose
    .connect(connectionString)
    .then(async () => {
      console.log(`Connected to Mongo DB ${dbName} at ${host}`)
    })
    .catch((e) => console.log(e))
}

if (process.env.NODE_ENV !== 'test') {
  //const server =
  app.listen(PORT, async (): Promise<void> => {
    console.log(`Auth server listening on http://${process.env.DB_HOST}:${PORT}`)
    await mongoConnect()
  })
}
