import express, { Request, Response, Router } from 'express'
import HttpStatusCode from '@utils/HttpStatusCode.js'
import { Anomaly, Intrusion, Outlier } from 'common/dist/domain/core'
import { anomalyController } from '@/infrastructure/api/controller/anomalies.js'
import { AnomalyPresenter } from 'common/dist/presentation/AnomalyPresenter.js'
import { AnomalySchema } from 'common/dist/presentation/schemas/AnomalySchema.js'

export const anomalyRouter: Router = express.Router()

anomalyRouter.route('/intrusions').get((req: Request, res: Response): void => {
  const limit: number = parseInt(req.query.limit as string) || 200
  anomalyController
    .getIntrusions(limit)
    .then((intrusions: Intrusion[]): void => {
      intrusions.forEach(intrusion => {
        AnomalyPresenter.asIntrusionDomainEvent(intrusion)
      })
      res.status(HttpStatusCode.OK).send(intrusions)
    })
    .catch((): void => {
      res.send({ error: 'No intrusions found' })
    })
})

anomalyRouter.route('/outliers').get((req: Request, res: Response): void => {
  const limit: number = parseInt(req.query.limit as string) || 200
  anomalyController
    .getOutliers(limit)
    .then((outliers: Outlier[]): void => {
      outliers.forEach((outlier: Outlier): void => {
        AnomalyPresenter.asOutlierDomainEvent(outlier)
      })
      res.status(HttpStatusCode.OK).send(outliers)
    })
    .catch((): void => {
      res.send({ error: 'No outliers found' })
    })
})

anomalyRouter.route('/:id').get((req: Request, res: Response): void => {
  anomalyController
    .getAnomalyById(req.params.id)
    .then((anomaly: Anomaly): void => {
      const anomalySchema: AnomalySchema = AnomalyPresenter.asMessage(anomaly)
      res.status(HttpStatusCode.OK).send(anomalySchema)
    })
    .catch((): void => {
      res.send({ error: 'No anomaly found' })
    })
})
