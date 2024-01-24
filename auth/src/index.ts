import type { Express, Request, Response } from 'express'
import express from 'express'

import { config } from 'dotenv'
import mongoose from 'mongoose'
import { userAccessRouter } from './routes/userAccess.js'
import { userRouter } from './routes/user.js'
import { Connect } from 'vite'
import { jwtManager } from './utils/JWTManager.js'
import NextFunction = Connect.NextFunction
import HttpStatusCode from "./utils/HttpStatusCode.js";

export const app: Express = express()
app.use(express.json())

config()

const PORT: number = Number(process.env.PORT) || 4000

app.use((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  console.log('token: ' + token)
  if (token === process.env.DEV_API_KEY) return next()
  if (req.url === '/login' && req.method === 'POST') return next()
  if (token === undefined) return res.status(HttpStatusCode.FORBIDDEN).send({ error: 'No authentication token' })
  else {
    console.log('Authentication token: ' + token)
    jwtManager.authenticate(req, res, next)
  }
})

app.use('/', userAccessRouter)
app.use('/users', userRouter)

const mongoConnect = async (): Promise<void> => {
  const connectionString: string = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
  await mongoose
    .connect(connectionString)
    .then(async () => {
      console.log(`Authentication server connected to db ${process.env.DB_NAME}`)
    })
    .catch((e) => console.log(e))
}

if (process.env.NODE_ENV !== 'test') {
  //const server =
  app.listen(PORT, async (): Promise<void> => {
    console.log(`Alarm server listening on http://${process.env.DB_HOST}:${PORT}`)
    await mongoConnect()
  })
}
