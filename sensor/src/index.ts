import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import { config } from 'dotenv'
import { jwtManager } from './utils/JWTManager.js'
import { getSensorInfo, produce } from './producer.js'

config({ path: process.cwd() + '/../.env' })

export const app: Express = express()

app.use(express.json())

const PORT: number = Number(process.env.SENSOR_PORT_1) || 6001

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

// TODO: ARE THEY USEFUL?? WE WANT TO USE THE DIRECT ACCESS O AXIOS???
const username: string = process.env.MONITORING_DB_USERNAME || 'admin'
const password: string = process.env.MONITORING_DB_PASSWORD || 'admin'
const host: string =
  process.env.NODE_ENV === 'develop' ? 'localhost' : process.env.MONITORING_DB_HOST || 'localhost'
const dbPort: string =
  process.env.NODE_ENV === 'develop'
    ? process.env.MONITORING_DB_PORT || '27017'
    : process.env.DEFAULT_DB_PORT || '27017'
const dbName: string = process.env.MONITORING_DB_NAME || 'monitoring'

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async (): Promise<void> => {
    console.log(`Sensor server listening on ${PORT}`)
    //await mongoConnect(mongoose, username, password, host, dbPort, dbName)
    await getSensorInfo()
    await produce()
  })
}
