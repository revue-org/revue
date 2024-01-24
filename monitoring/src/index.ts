import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import { deviceRouter } from './routes/device.js'
import { jwtManager } from './utils/JWTManager.js'
import { type Consumer, Kafka } from 'kafkajs'

config()
export const app: Express = express()
app.use(express.json())

const PORT: number = Number(process.env.PORT) || 4000

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

app.use('/devices', deviceRouter)

const mongoConnect = async (): Promise<void> => {
  const connectionString: string = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
  await mongoose
    .connect(connectionString)
    .then(async (): Promise<void> => {
      console.log(`Monitoring server connected to db ${process.env.DB_NAME}`)
    })
    .catch((err): void => {
      console.log(err)
      throw err
    })
}

if (process.env.NODE_ENV !== 'test') {
  //const server =
  app.listen(PORT, async (): Promise<void> => {
    console.log(`Monintoring server listening on http://${process.env.DB_HOST}:${PORT}`)
    await mongoConnect()

/*    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092']
    })

    const consumer: Consumer = kafka.consumer({ groupId: 'test-group' })
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    await consumer.connect()
    await consumer
      .run({
        eachMessage: async ({ topic, partition, message }) => {
          // @ts-ignore
          console.log({
            partition,
            offset: message.offset,
            // @ts-ignore
            value: message.value.toString()
          })
        }
      })
      .catch((err) => console.error(err))*/
  })
}
