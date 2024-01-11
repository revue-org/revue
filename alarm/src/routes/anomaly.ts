import { anomalyController } from '../controller/anomaly.js'
import express, { Router } from 'express'
import { Intrusion } from 'domain/dist/domain/anomaly/core/Intrusion.js'
import { Exceeding } from 'domain/dist/domain/anomaly/core/Exceeding.js'

export const anomalyRouter: Router = express.Router()

anomalyRouter.route('/:id').get((req, res) => {
  anomalyController
    .getAnomalyById(req)
    .then((anomaly: Intrusion | Exceeding): void => {
      res.send(anomaly)
    })
    .catch((): void => {
      res.send({ error: 'No anomaly found' })
    })
})

anomalyRouter.route('/intrusion').get((req, res) => {
  anomalyController
    .getIntrusions()
    .then((intrusions: Intrusion[]): void => {
      res.send(intrusions)
    })
    .catch((): void => {
      res.send({ error: 'No intrusions found' })
    })
})
anomalyRouter.route('/exceeding').get((req, res) => {
  anomalyController
    .getExceedings()
    .then((exceedings: Exceeding[]): void => {
      res.send(exceedings)
    })
    .catch((): void => {
      res.send({ error: 'No exceedings found' })
    })
})
anomalyRouter.route('/').post((req, res) => {
  anomalyController
    .createAnomaly(req)
    .then((): void => {
      res.send({ success: 'Anomaly created' })
    })
    .catch((): void => {
      res.send({ error: 'Anomaly not created' })
    })
})
anomalyRouter.route('/').put((req, res) => {
  anomalyController
    .updateAnomaly(req)
    .then((): void => {
      res.send({ success: 'Anomaly correctly updated' })
    })
    .catch((): void => {
      res.send({ error: 'Anomaly not updated' })
    })
})

anomalyRouter.route('/').delete((req, res) => {
  anomalyController.deleteAnomaly(req)
    .then((): void => {
      res.send({ success: 'Anomaly correctly deleted' })
    })
    .catch((): void => {
      res.send({ error: 'Anomaly not deleted' })
    })
})
