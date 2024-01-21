import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { indexRouter } from './routes/index.js'
import { deviceRouter } from './routes/device.js'
import { jwtManager } from './utils/JWTManager.js'

config()

export const __dirname: string = dirname(fileURLToPath(import.meta.url)) + '/../../'
const app: Express = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'client')))

const PORT: number = Number(process.env.PORT) || 3000

app.use((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token !== process.env.DEV_API_KEY) {
    jwtManager.authenticate(req, res, next)
  } else {
    console.log('Develop authentication token: ' + token)
    return next()
  }
})

app.use(indexRouter)
app.use('/device', deviceRouter)

const mongoConnect = async () => {
  const connectionString: string = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
  await mongoose
    .connect(connectionString)
    .then(async () => {
      console.log(`Monitoring server listening on http://${process.env.DB_HOST}:${PORT}`)
    })
    .catch((e) => console.log(e))
}

import { type Consumer, Kafka } from 'kafkajs'

app.listen(PORT, async (): Promise<void> => {
  // mongoConnect()

  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
  })

  const consumer: Consumer = kafka.consumer({ groupId: 'test-group' })
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
  await consumer.connect()
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // @ts-ignore
      console.log({
        partition,
        offset: message.offset,
        // @ts-ignore
        value: message.value.toString()
      })
    }
  }).catch((err) => console.error(err))
})
