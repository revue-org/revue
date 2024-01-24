import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import { anomalyRouter } from './routes/anomaly.js'
import { notificationRouter } from './routes/notification.js'
import { recognizingNodeRouter } from './routes/recognizingNode.js'
import { securityRuleRouter } from './routes/securityRule.js'
import { jwtManager } from './utils/JWTManager.js'

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

app.use('/notifications', notificationRouter)
app.use('/anomalies', anomalyRouter)
app.use('/recognizing-nodes', recognizingNodeRouter)
app.use('/security-rules', securityRuleRouter)

const mongoConnect = async (): Promise<void> => {
  const connectionString: string = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
  await mongoose
    .connect(connectionString)
    .then(async (): Promise<void> => {
      console.log(`Authentication server connected to db ${process.env.DB_NAME}`)
    })
    .catch((e) => console.log(e))
}

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async (): Promise<void> => {
    console.log(`Alarm server listening on http://${process.env.DB_HOST}:${PORT}`)
    await mongoConnect()
  })
}

