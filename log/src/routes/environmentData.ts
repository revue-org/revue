import express, { Request, Response, Router } from 'express'
import { environmentDataController } from '../controller/environmentData.js'
import { EnvironmentData } from '@domain/device/core/EnvironmentData.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'
import { DeviceTypeConverter } from '@utils/DeviceTypeConverter.js'

export const environmentDataRouter: Router = express.Router()

environmentDataRouter.route('/').get((_req: Request, res: Response): void => {
  environmentDataController
    .getEnvironmentData()
    .then((environmentData: EnvironmentData[]): void => {
      res.status(HttpStatusCode.OK).send(environmentData)
    })
    .catch((): void => {
      res.send({ error: 'No data found' })
    })
})

environmentDataRouter.route('/:code').get((req: Request, res: Response): void => {
  environmentDataController
    .getDataByDeviceId(DeviceTypeConverter.convertToDeviceType(req.params.type), req.params.code)
    .then((environmentData: EnvironmentData[]): void => {
      res.status(HttpStatusCode.OK).send(environmentData)
    })
    .catch((): void => {
      res.send({ error: 'No data found' })
    })
})
