import { anomalyController } from '../controller/anomaly.js'
import express, { Router } from 'express'

export const anomalyRouter: Router = express.Router()

anomalyRouter.route('/intrusions').get((req, res) => {
  anomalyController.getIntrusions(req, res)
})
anomalyRouter.route('/exceedings').get((req, res) => {
  anomalyController.getExceedings(req, res)
})
anomalyRouter.route('/').post((req, res) => {
  anomalyController.createAnomaly(req, res)
})
anomalyRouter.route('/').put((req, res) => {
  anomalyController.updateAnomaly(req, res)
})

anomalyRouter.route('/:id').delete((req, res) => {
  anomalyController.deleteAnomaly(req, res)
})
