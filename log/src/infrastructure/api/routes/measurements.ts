import express, { Request, Response, Router } from 'express'
import { measurementController } from '../controller/measurements.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'
import { Measurement } from 'common/dist/domain/core'

export const measurementRouter: Router = express.Router()

measurementRouter.route('/').get((req: Request, res: Response): void => {
  const limit: number = parseInt(req.query.limit as string) || 200
  measurementController
    .getMeasurements(limit)
    .then((measurements: Measurement[]): void => {
      res.status(HttpStatusCode.OK).send(measurements)
    })
    .catch((): void => {
      res.send({ error: 'No measurements found' })
    })
})

measurementRouter.route('/:deviceId').get((req: Request, res: Response): void => {
  const limit: number = parseInt(req.query.limit as string) || 200
  measurementController
    .getMeasurementsBySourceDeviceId(req.params.deviceId, limit)
    .then((measurements: Measurement[]): void => {
      res.status(HttpStatusCode.OK).send(measurements)
    })
    .catch((): void => {
      res.send({ error: 'No measurements found' })
    })
})
