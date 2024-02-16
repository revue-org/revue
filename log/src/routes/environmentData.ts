import express, { Request, Response, Router } from 'express'
import { environmentDataController } from '../controller/environmentData.js'
import { EnvironmentData } from '@domain/device/core/EnvironmentData.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'
import { DeviceTypeConverter } from '@utils/DeviceTypeConverter.js'
import { MeasureConverter } from '@utils/MeasureConverter.js'
import { MeasureUnitConverter } from '@utils/MeasureUnitConverter.js'

export const environmentDataRouter: Router = express.Router()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

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

environmentDataRouter.route('/:code').get((_req: Request, res: Response): void => {
  environmentDataController
    .getDataByDeviceId(DeviceTypeConverter.convertToDeviceType(_req.params.type), _req.params.code)
    .then((environmentData: EnvironmentData[]): void => {
      res.status(HttpStatusCode.OK).send(environmentData)
    })
    .catch((): void => {
      res.send({ error: 'No data found' })
    })
})
environmentDataRouter.route('/').post((req: Request, res: Response): void => {
  environmentDataController
    .createEnvironmentData(
      deviceIdFactory.createSensorId(req.body.code),
      req.body.value,
      MeasureConverter.convertToMeasure(req.body.measure),
      MeasureUnitConverter.convertToMeasureUnit(req.body.measureUnit),
      new Date(req.body.timestamp)
    )
    .then((): void => {
      res.status(HttpStatusCode.CREATED).send({ success: 'Environment data created' })
    })
    .catch((): void => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: 'Environment data not created' })
    })
})
environmentDataRouter.route('/').put((req: Request, res: Response): void => {
  environmentDataController
    .updateEnvironmentData(
      deviceIdFactory.createSensorId(req.body.code),
      req.body.value,
      MeasureConverter.convertToMeasure(req.body.measure),
      MeasureUnitConverter.convertToMeasureUnit(req.body.unit),
      new Date(req.body.timestamp)
    )
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Environment data correctly updated' })
    })
    .catch((): void => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: 'Environment data not updated' })
    })
})

environmentDataRouter.route('/:id').delete((req: Request, res: Response): void => {
  environmentDataController
    .deleteEnvironmentData(req.params.id)
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Environment data correctly deleted' })
    })
    .catch((): void => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: 'Environment data not deleted' })
    })
})
