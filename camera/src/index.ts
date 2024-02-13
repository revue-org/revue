import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import { config } from 'dotenv'
import { jwtManager } from './utils/JWTManager.js'
import cors from 'cors'
import process from 'process'
import http, { Server as HttpServer } from 'http'

import { getCameraInfo, produce } from './producer.js'

config({ path: process.cwd() + '/../.env' })

export const app: Express = express()

app.use('/stream', express.static('stream'))
app.use(express.json())
app.use(cors())

const PORT: number = Number(process.env.CAMERA_PORT) || 5001

const server: HttpServer = http.createServer(app)

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

// app.use('/stream', streamRouter)

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, async (): Promise<void> => {
    console.log(`Camera server listening on ${PORT}`)
    await getCameraInfo()
    await produce()
  })
}
