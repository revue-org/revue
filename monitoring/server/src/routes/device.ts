import { deviceController } from '../controller/device.js'
import express from 'express'

export const movieRouter = express.Router()

movieRouter
  .route('/')
  .get((req, res) => {
    deviceController.readAllMovies(req, res)
  })
  .post((req, res) => {
    deviceController.createMovie(req, res)
  })

movieRouter
  .route('/:id')
  .get((req, res) => {
    deviceController.readMovie(req, res)
  })
  .put((req, res) => {})
  .delete((req, res) => {})
