import { anomalyController } from '../controller/anomaly.js'
import express, { Request, Response, Router } from 'express'
import { Intrusion } from 'domain/dist/domain/anomaly/core/Intrusion.js'
import { Exceeding } from 'domain/dist/domain/anomaly/core/Exceeding.js'
import { Anomaly } from 'domain/dist/domain/anomaly/core/Anomaly.js'

export const anomalyRouter: Router = express.Router()

anomalyRouter.route('/:id').get((req: Request, res: Response): void => {
  anomalyController
    .getAnomalyById(req.params.id)
    .then((anomaly: Anomaly): void => {
      res.send(anomaly)
    })
    .catch((): void => {
      res.send({ error: 'No anomaly found' })
    })
})

anomalyRouter.route('/intrusion').get((req: Request, res: Response): void => {
  anomalyController
    .getIntrusions()
    .then((intrusions: Intrusion[]): void => {
      res.send(intrusions)
    })
    .catch((): void => {
      res.send({ error: 'No intrusions found' })
    })
})
anomalyRouter.route('/exceeding').get((req: Request, res: Response): void => {
  anomalyController
    .getExceedings()
    .then((exceedings: Exceeding[]): void => {
      res.send(exceedings)
    })
    .catch((): void => {
      res.send({ error: 'No exceedings found' })
    })
})
anomalyRouter.route('/').post((req: Request, res: Response): void => {
  anomalyController
    .createAnomaly(req)
    .then((): void => {
      res.send({ success: 'Anomaly created' })
    })
    .catch((): void => {
      res.send({ error: 'Anomaly not created' })
    })
})
anomalyRouter.route('/').put((req: Request, res: Response): void => {
  anomalyController
    .updateAnomaly(req)
    .then((): void => {
      res.send({ success: 'Anomaly correctly updated' })
    })
    .catch((): void => {
      res.send({ error: 'Anomaly not updated' })
    })
})

anomalyRouter.route('/').delete((req: Request, res: Response): void => {
  anomalyController
    .deleteAnomaly(req.body.id, req.body.type)
    .then((): void => {
      res.send({ success: 'Anomaly correctly deleted' })
    })
    .catch((): void => {
      res.send({ error: 'Anomaly not deleted' })
    })
})
