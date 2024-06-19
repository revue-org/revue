import express, { Request, Response, Router } from 'express'
import HttpStatusCode from '@utils/HttpStatusCode.js'
import { Anomaly, Intrusion, Outlier } from 'common/dist/domain/core'
import { anomalyController } from '@/infrastructure/api/controller/anomalies'

export const anomalyRouter: Router = express.Router()

anomalyRouter.route('/intrusions').get((req: Request, res: Response): void => {
  anomalyController
    .getIntrusions()
    .then((intrusions: Intrusion[]): void => {
      res.status(HttpStatusCode.OK).send(intrusions)
    })
    .catch((): void => {
      res.send({ error: 'No intrusions found' })
    })
})

anomalyRouter.route('/outliers').get((req: Request, res: Response): void => {
  anomalyController
    .getOutliers()
    .then((exceedings: Outlier[]): void => {
      res.status(HttpStatusCode.OK).send(exceedings)
    })
    .catch((): void => {
      res.send({ error: 'No exceedings found' })
    })
})

anomalyRouter.route('/:id').get((req: Request, res: Response): void => {
  anomalyController
    .getAnomalyById(req.params.id)
    .then((anomaly: Anomaly): void => {
      res.status(HttpStatusCode.OK).send(anomaly)
    })
    .catch((): void => {
      res.send({ error: 'No anomaly found' })
    })
})
