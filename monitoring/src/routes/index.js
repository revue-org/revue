import express from 'express'
import { __dirname } from '../index.js'
export const indexRouter = express.Router()
indexRouter.route('/').get((req, res) => {
  res.sendFile('index.html', { root: __dirname + '/server' })
})
