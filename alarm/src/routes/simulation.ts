import { simulationController } from '../controller/simulation.js'
import express, { Request, Response, Router } from 'express'
import HttpStatusCode from '@utils/HttpStatusCode.js'
import { MeasureConverter } from '@utils/MeasureConverter.js'
import { ObjectClassConverter } from '@utils/ObjectClassConverter.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { anomalyController } from '../controller/anomaly.js'

export const simulationRouter: Router = express.Router()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

simulationRouter.route('/exceedings').post((req: Request, res: Response): void => {
  anomalyController
    .createExceeding(
      deviceIdFactory.createSensorId(req.body.deviceId.code),
      MeasureConverter.convertToMeasure(req.body.measure),
      req.body.value
    )
    .then((): void => {
      anomalyController.getExceedings().then(exceedings => {
        let exceeding = exceedings[exceedings.length - 1]
        simulationController
          .simulateExceeding(
            // @ts-ignore
            exceeding._id.toString(),
            deviceIdFactory.createSensorId(req.body.deviceId.code),
            MeasureConverter.convertToMeasure(req.body.measure),
            req.body.value
          )
          .then((): void => {
            console.log('CI PASSO')
            res.status(HttpStatusCode.OK).send({ success: 'Exceeding created' })
          })
          .catch((): void => {
            res.send({ error: 'Error while creating the simulation' })
          })
      })
    })
})

simulationRouter.route('/intrusions').post((req: Request, res: Response): void => {
  // same thing as above
  anomalyController
    .createIntrusion(
      deviceIdFactory.createCameraId(req.body.deviceId.code),
      ObjectClassConverter.convertToObjectClass(req.body.intrusionObject)
    )
    .then((): void => {
      anomalyController.getIntrusions().then(intrusions => {
        let intrusion = intrusions[intrusions.length - 1]
        simulationController
          .simulateIntrusion(
            // @ts-ignore
            intrusion._id.toString(),
            deviceIdFactory.createCameraId(req.body.deviceId.code),
            ObjectClassConverter.convertToObjectClass(req.body.intrusionObject)
          )
          .then((): void => {
            res.status(HttpStatusCode.OK).send({ success: 'Intrusion created' })
          })
          .catch((): void => {
            res.send({ error: 'Error while creating the simulation' })
          })
      })
      res.status(HttpStatusCode.OK)
    })
})
