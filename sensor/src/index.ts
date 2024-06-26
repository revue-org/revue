import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import { config } from 'dotenv'
import { jwtManager } from '@utils/JWTManager.js'
import { getSensorInfo, produce } from '@/producer.js'

config({ path: process.cwd() + '/../.env' })

export const app: Express = express()

app.use(express.json())

app.route('/capabilities').get((req: Request, res: Response): void => {
  const capability = {
    type: 'sensor',
    capturingInterval: 1000,
    measure: {
      type: 'temperature',
      unit: 'celsius'
    }
  }
  res.send({ capabilities: [capability] })
})

const PORT: number = Number(process.env.SENSOR_PORT)

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

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async (): Promise<void> => {
    console.log(`Sensor server listening on ${PORT}`)
    await getSensorInfo()
    await produce()
  })
}
