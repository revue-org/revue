import express from 'express'
import { config } from 'dotenv'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import { userRouter } from './routes/user.js'
import { indexRouter } from './routes'
import { deviceRouter } from './routes/device.js'
import { MonitoringManager } from 'storage/monitoring/MonitoringManager'
new MonitoringManager().getAllUsers()
config()
export const __dirname = dirname(fileURLToPath(import.meta.url)) + '/../../'
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'client')))
const PORT = Number(process.env.PORT) || 443
app.use(indexRouter)
app.use('/user', userRouter)
app.use('/device', deviceRouter)
app.use((_, res) => {
  res.status(404).send('<h1>404 Page Not Found!</h1>')
})
const mongoConnect = async () => {
  try {
    await mongoose.connect('mongodb://root:example@localhost:27017/monitoring?authSource=admin')
  } catch (err) {
    console.log(err)
  }
}
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
  // mongoConnect().then(r => console.log("connected to monitoring database"))
})
