import express, { Express } from 'express'
import { config } from 'dotenv'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { indexRouter } from './routes'

config()
export const __dirname: string = dirname(fileURLToPath(import.meta.url)) + '/../'
const app: Express = express()
app.use(express.json())

const PORT: number = Number(process.env.PORT) || 443

app.use(indexRouter)
app.use((req, res) => {
  // send html page with title 404
  res.status(404).send('<h1>404 Page Not Found!</h1>')
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
