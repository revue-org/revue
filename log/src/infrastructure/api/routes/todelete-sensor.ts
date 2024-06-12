import express, { Request, Response, Router } from 'express'
import { sensorController } from '../controller/todelete-sensor.js'
import { EnvironmentData } from 'domain/dist/domain/device/core'
import HttpStatusCode from 'domain/dist/utils/HttpStatusCode.js'

export const sensorRouter: Router = express.Router()

sensorRouter.route('/:code/environment-data').get((req: Request, res: Response): void => {
  sensorController
    .getDataBySensorCode(req.params.code)
    .then((environmentData: EnvironmentData[]): void => {
      res.status(HttpStatusCode.OK).send(environmentData)
    })
    .catch((): void => {
      res.send({ error: 'No data found' })
    })
})

sensorRouter.route('/:code/environment-data/latest').get((req: Request, res: Response): void => {
  const quantity: number = req.query.quantity as unknown as number
  if (!quantity) {
    res.status(HttpStatusCode.BAD_REQUEST).send({ error: 'Quantity parameter is required' })
    return
  }
  sensorController
    .getLatestDataBySensorCode(req.params.code, quantity)
    .then((environmentData: EnvironmentData[]): void => {
      res.status(HttpStatusCode.OK).send(environmentData)
    })
    .catch((): void => {
      res.send({ error: 'No data found' })
    })
})
