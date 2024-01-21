import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
// import { securityRuleRouter } from './routes/securityRule.js'
import { jwtManager } from './utils/JWTManager.js'

config()

export const app: Express = express()

app.use(express.json())

const PORT: number = Number(process.env.PORT) || 4001

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

import { Kafka, Partitioners, Producer } from 'kafkajs'

if (process.env.NODE_ENV === 'test') {
  // mongoConnect()
} else {
  app.listen(PORT, async (): Promise<void> => {
    console.log(`Camera server listening on ${PORT}`)
    // mongoConnect()

    const kafka: Kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092']
    })

    const producer: Producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
    await producer.connect()
    await producer.send({
      topic: 'test-topic',
      messages: [
        { value: 'Hello KafkaJS user!' }
      ]
    }).catch((err) => console.error(err))

  })
}
