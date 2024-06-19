import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import { config } from 'dotenv'
import { jwtManager } from './utils/JWTManager.js'
import cors from 'cors'
import process from 'process'

import { produce } from './producer.js'

config({ path: process.cwd() + '/../.env' })

export const app: Express = express()

app.use(express.json())
app.use(cors())

const PORT = Number(process.env.CAMERA_PORT)

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
    console.log(`Camera server listening on ${PORT}`)
    await produce()
  })
}
