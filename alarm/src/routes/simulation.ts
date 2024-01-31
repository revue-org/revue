import { simulationController } from '../controller/simulation.js'
import express, { Request, Response, Router } from 'express'
import HttpStatusCode from '../utils/HttpStatusCode.js'
import { MeasureConverter } from '@utils/MeasureConverter.js'
import { ObjectClassConverter } from '@utils/ObjectClassConverter.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'

export const simulationRouter: Router = express.Router()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

simulationRouter.route('/exceedings').post((req: Request, res: Response): void => {
  simulationController
    .simulateExceeding(
      req.body.anomalyId,
      deviceIdFactory.createSensorId(req.body.deviceId.code),
      MeasureConverter.convertToMeasure(req.body.measure),
      req.body.value
    )
    .then((): void => {
      res.status(HttpStatusCode.OK)
    })
    .catch((): void => {
      res.send({ error: 'Error while creating the simulation' })
    })
})

simulationRouter.route('/intrusions').post((req: Request, res: Response): void => {
  simulationController
    .simulateIntrusion(
      req.body.anomalyId,
      deviceIdFactory.createCameraId(req.body.deviceId.code),
      ObjectClassConverter.convertToObjectClass(req.body.intrusionObject)
    )
    .then((): void => {
      res.status(HttpStatusCode.OK)
    })
    .catch((): void => {
      res.send({ error: 'Error while creating the simulation' })
    })
})
