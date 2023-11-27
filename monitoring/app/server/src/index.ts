import express from 'express'
import type {Express} from 'express'
import type MonitoringManager from 'domain'

import {config} from 'dotenv'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import {indexRouter} from './routes'
import mongoose from 'mongoose';
import {userRouter} from "./routes/user";

config()

export const __dirname: string = dirname(fileURLToPath(import.meta.url)) + '/../../'
const app: Express = express()


app.use(express.json())
app.use(express.static(path.join(__dirname, 'client')))

const PORT: number = Number(process.env.PORT) || 443

app.use(indexRouter)
app.use("/user", userRouter);

app.use((req, res) => {
    res.status(404).send('<h1>404 Page Not Found!</h1>')
})

const mongoConnect = async () => {
    try {
        await mongoose.connect('mongodb://root:example@localhost:27017/revue?authSource=admin');
    } catch (err) {
        console.log(err);
    }
}

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
    mongoConnect().then(r => console.log("connected to revue database"))
})
