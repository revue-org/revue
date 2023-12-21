import type { Express, Request, Response } from 'express'
import express from 'express'

import { config } from 'dotenv'
import mongoose from 'mongoose'
import { userRouter } from "./routes/user.js";

const app: Express = express()
app.use(express.json())

config()

const PORT: number = Number(process.env.PORT) || 4000

app.use('/', userRouter)

app.use((_: Request, res: Response) => {
  res.status(404).send('<h1>404 Page Not Found!</h1>')
})

const mongoConnect = async () => {
  const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
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
