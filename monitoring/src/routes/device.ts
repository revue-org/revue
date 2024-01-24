import express, { Request, Response, Router } from 'express'
import { deviceController } from '../controller/device.js'
import { Camera } from '@domain/device/core/Camera.js'
import { Sensor } from '@domain/device/core/Sensor.js'
import { Device } from '@domain/device/core/Device.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { ResolutionFactory } from '@domain/device/factories/ResolutionFactory.js'
import { ResolutionFactoryImpl } from '@domain/device/factories/impl/ResolutionFactoryImpl.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import HttpStatusCode from '../utils/HttpStatusCode.js'

export const deviceRouter: Router = express.Router()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()

deviceRouter.route('/cameras').get((req: Request, res: Response): void => {
  deviceController
    .getCameras()
    .then((cameras: Camera[]): void => {
      res.status(HttpStatusCode.OK).send(cameras)
    })
    .catch((): void => {
      res.send({ error: 'No cameras found' })
    })
})
deviceRouter.route('/sensors').get((req: Request, res: Response): void => {
  deviceController
    .getSensors()
    .then((sensors: Sensor[]): void => {
      res.status(HttpStatusCode.OK).send(sensors)
    })
    .catch((): void => {
      res.send({ error: 'No sensors found' })
    })
})

deviceRouter.route('/:type&:code').get((req: Request, res: Response): void => {
  deviceController
    .getDeviceById(req.params.type, req.params.code)
    .then((device: Device): void => {
      res.status(HttpStatusCode.OK).send(device)
    })
    .catch((): void => {
      res.send({ error: 'Device not found' })
    })
})

deviceRouter.route('/cameras').post((req: Request, res: Response): void => {
  deviceController
    .createCamera(
      deviceIdFactory.createCameraId(req.body.code),
      req.body.ipAddress,
      resolutionFactory.createResolution(req.body.resolution.width, req.body.resolution.height)
    )
    .then((): void => {
      res.status(HttpStatusCode.CREATED).send({ success: 'Camera created' })
    })
    .catch((err): void => {
      res.send({ error: 'Camera not created' })
    })
})

deviceRouter.route('/sensors').post((req: Request, res: Response): void => {
  deviceController
    .createSensor(
      deviceIdFactory.createSensorId(req.body.code),
      req.body.ipAddress,
      req.body.intervalMillis,
      req.body.measures as Measure[]
    )
    .then((): void => {
      res.status(HttpStatusCode.CREATED).send({ success: 'Sensor created' })
    })
    .catch((err): void => {
      res.send({ error: 'Sensor not created' })
    })
})

deviceRouter.route('/cameras').put((req: Request, res: Response): void => {
  deviceController
    .updateCamera(
      deviceIdFactory.createCameraId(req.body.code),
      req.body.ipAddress,
      resolutionFactory.createResolution(req.body.resolution.width, req.body.resolution.height)
    )
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Camera correctly updated' })
    })
    .catch((): void => {
      res.send({ error: 'Camera not updated' })
    })
})

deviceRouter.route('/sensors').put((req: Request, res: Response): void => {
  deviceController
    .updateSensor(
      deviceIdFactory.createSensorId(req.body.code),
      req.body.ipAddress,
      req.body.intervalMillis,
      req.body.measures as Measure[]
    )
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Sensor correctly updated' })
    })
    .catch((): void => {
      res.send({ error: 'Sensor not updated' })
    })
})

deviceRouter.route('/').delete((req: Request, res: Response): void => {
  deviceController
    .deleteDevice(req.body.type, req.body.code)
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Device correctly deleted' })
    })
    .catch((): void => {
      res.send({ error: 'Device not deleted' })
    })
})
