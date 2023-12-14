import { anomalyController } from '../controller/anomaly.js'
import express from 'express'

export const anomalyRouter = express.Router()

anomalyRouter.route('/').get((req, res) => {
  anomalyController.getAnomalies(req, res)
})
//TODO to add get dell'id
anomalyRouter.route('/:id').get((req, res) => {
  anomalyController.getAnomaly(req, res)
})
anomalyRouter.route('/').post((req, res) => {
  anomalyController.createAnomaly(req, res)
})
anomalyRouter.route('/').put((req, res) => {
  anomalyController.updateAnomaly(req, res)
})
//TODO to add get dell'id
anomalyRouter.route('/:id').delete((req, res) => {
  anomalyController.deleteAnomaly(req, res)
})
