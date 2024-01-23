import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import mongoose from 'mongoose'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { indexRouter } from './routes/index.js'
import { deviceRouter } from './routes/device.js'
import { jwtManager } from './utils/JWTManager.js'
import { config } from 'dotenv'
import { type Consumer, Kafka } from 'kafkajs'
import * as console from 'console'

config()

export const __dirname: string = dirname(fileURLToPath(import.meta.url)) + '/../../'
const app: Express = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'client')))

const PORT: number = Number(process.env.MONITORING_PORT) || 3001

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
  const port: string = process.env.MONITORING_DB_PORT || '27017'
  const username: string = process.env.MONITORING_DB_USERNAME || 'admin'
  const password: string = process.env.MONITORING_DB_PASSWORD || 'admin'
  const host: string = process.env.MONITORING_DB_HOST || 'localhost'
  const dbName: string = process.env.MONITORING_DB_NAME || 'monitoring'
  const connectionString: string = `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`
  await mongoose
    .connect(connectionString)
    .then(async () => {
      console.log(`Monitoring server listening on port ${PORT}`)
    })
    .catch((e) => console.log(e))
}

app.listen(PORT, async (): Promise<void> => {
  await mongoConnect()
  //
  // const kafka = new Kafka({
  //   clientId: 'monitoring',
  //   brokers: ['revue-kafka:9092']
  // })

  // const consumer: Consumer = kafka.consumer({ groupId: 'test-group' })
  // await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
  // await consumer.connect()
  // await consumer
  //   .run({
  //     eachMessage: async ({ topic, partition, message }) => {
  //       // @ts-ignore
  //       console.log({
  //         partition,
  //         offset: message.offset,
  //         // @ts-ignore
  //         value: message.value.toString()
  //       })
  //     }
  //   })
  //   .catch((err) => console.error(err))
})
