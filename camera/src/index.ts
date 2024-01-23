import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
// import { securityRuleRouter } from './routes/securityRule.js'
import { jwtManager } from './utils/JWTManager.js'
import { Kafka, Partitioners, Producer } from 'kafkajs'
import fs from 'fs'
import path from 'path'

config()

export const app: Express = express()

app.use(express.json())

const PORT: number = Number(process.env.CAMERA_PORT) || 5001

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

//app.use(indexRouter)
// app.use('/security-rules', securityRuleRouter)

const mongoConnect = async () => {
  const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
  await mongoose
    .connect(connectionString)
    .then(async () => {
      console.log(
        `Connected to MongoDB database ${process.env.DB_NAME} at ${process.env.DB_HOST}:${process.env.DB_PORT}`
      )
    })
    .catch((e) => console.log(e))
}

if (process.env.NODE_ENV === 'test') {
  // mongoConnect()
} else {
  app.listen(PORT, async (): Promise<void> => {
    console.log(`Camera server listening on ${PORT}`)
    // mongoConnect()

    const kafka: Kafka = new Kafka({
      clientId: 'camera', // TODO: Change this to Device ID
      brokers: ['revue-kafka:9092']
    })

    const producer: Producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
    await producer.connect()
    produce(producer)
  })
}

const produce = (producer: Producer) => {
  fs.readFile(path.resolve('video.mp4'), async function (err, data: Buffer) {
    if (err) {
      throw err
    }
    let movieData: Buffer = data

    let i,
      j,
      tmpArray,
      chunk = 1000000
    let index = 0
    for (i = 0, j = movieData.length; i < j; i += chunk) {
      tmpArray = movieData.subarray(i, i + chunk)
      producer
        .send({
          topic: 'test-topic',
          messages: [
            {
              value: tmpArray,
              key: String(index)
            }
          ]
        })
        .then((r) => console.log('THEN' + r))
      index++
    }
    await producer.disconnect()
  })
}
