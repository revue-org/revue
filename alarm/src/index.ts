import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import { anomalyRouter } from './routes/anomaly.js'
import { notificationRouter } from './routes/notification.js'
import { recognizingNodeRouter } from './routes/recognizingNode.js'
import { securityRuleRouter } from './routes/securityRule.js'
import { jwtManager } from './utils/JWTManager.js'
import cors from 'cors'

config()

export const app: Express = express()

app.use(express.json())
app.use(cors());

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

app.use('/notifications', notificationRouter)
app.use('/anomalies', anomalyRouter)
app.use('/recognizing-nodes', recognizingNodeRouter)
app.use('/security-rules', securityRuleRouter)

const mongoConnect = async (): Promise<void> => {
  const username: string = process.env.ALARM_DB_USERNAME || 'admin'
  const password: string = process.env.ALARM_DB_PASSWORD || 'admin'
  const host: string =
    process.env.NODE_ENV === 'develop' ? 'localhost' : process.env.ALARM_DB_HOST || 'localhost'
  const dbName: string = process.env.ALARM_DB_NAME || 'monitoring'
  const dbPort: string = process.env.NODE_ENV === 'develop' ? process.env.ALARM_DB_PORT || '27017' : process.env.DEFAULT_DB_PORT || '27017'
  const connectionString: string = `mongodb://${username}:${password}@${host}:${dbPort}/${dbName}?authSource=admin`
  console.log(connectionString)
  await mongoose
    .connect(connectionString)
    .then(async (): Promise<void> => {
      console.log(`Connected to Mongo DB ${dbName} at ${host}`)
    })
    .catch((e) => console.log(e))
}

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async (): Promise<void> => {
    console.log(`Alarm server listening on port ${PORT}`)
    await mongoConnect()
  })
}
