import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import { jwtManager } from './utils/JWTManager.js'
import { getSensorInfo, produce } from './producer.js'

config({ path: process.cwd() + '/../.env' })

export const app: Express = express()

app.use(express.json())

const PORT: number = Number(process.env.SENSOR_PORT) || 6001

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

const mongoConnect = async () => {
  const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
  await mongoose
    .connect(connectionString)
    .then(async () => {
      console.log(
        `Connected to MongoDB database ${process.env.DB_NAME} at ${process.env.DB_HOST}:${process.env.DB_PORT}`
      )
    })
    .catch(e => console.log(e))
}

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async (): Promise<void> => {
    console.log(`Sensor server listening on ${PORT}`)
    await mongoConnect()
    await getSensorInfo()
    await produce()
  })
}
