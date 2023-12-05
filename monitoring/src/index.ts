import type { Express, Request, Response } from 'express'
import express from 'express'

import { config } from 'dotenv'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import { indexRouter } from './routes'
import { deviceRouter } from './routes/device.js'

config()

export const __dirname: string = dirname(fileURLToPath(import.meta.url)) + '/../../'
const app: Express = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'client')))

const PORT: number = Number(process.env.PORT) || 443

app.use(indexRouter)
app.use('/device', deviceRouter)

app.use((_: Request, res: Response) => {
  res.status(404).send('<h1>404 Page Not Found!</h1>')
})

const mongoConnect = async () => {
  const connectionString =
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;
  await mongoose
    .connect(connectionString)
    .then(async () => {
      console.log(`Authentication server listening on http://${process.env.DB_HOST}:${PORT}`)
    })
    .catch((e) => console.log(e))
}

app.listen(PORT, () => {
  mongoConnect()
})
