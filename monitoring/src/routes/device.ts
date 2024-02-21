import express, { Request, Response, Router } from 'express'
import { deviceController } from '../controller/device.js'
import { Device } from '@domain/device/core/Device.js'
import { Camera } from '@domain/device/core/Camera.js'
import { Sensor } from '@domain/device/core/Sensor.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { ResolutionFactory } from '@domain/device/factories/ResolutionFactory.js'
import { ResolutionFactoryImpl } from '@domain/device/factories/impl/ResolutionFactoryImpl.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

export const deviceRouter: Router = express.Router()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()

deviceRouter.route('/').get((_req: Request, res: Response): void => {
  deviceController
    .getDevices()
    .then((devices: Device[]): void => {
      res.status(HttpStatusCode.OK).send(devices)
    })
    .catch((): void => {
      res.send({ error: 'No devices found' })
    })
})

deviceRouter.route('/cameras').get((_req: Request, res: Response): void => {
  deviceController
    .getCameras()
    .then((cameras: Camera[]): void => {
      res.status(HttpStatusCode.OK).send(cameras)
    })
    .catch((): void => {
      res.send({ error: 'No cameras found' })
    })
})

deviceRouter.route('/cameras/:code').get((req: Request, res: Response): void => {
  deviceController
    .getCameraByCode(req.params.code)
    .then((camera: Camera): void => {
      res.send(camera)
    })
    .catch((): void => {
      res.send({ error: 'Camera not found' })
    })
})

deviceRouter.route('/sensors').get((_req: Request, res: Response): void => {
  deviceController
    .getSensors()
    .then((sensors: Sensor[]): void => {
      res.status(HttpStatusCode.OK).send(sensors)
    })
    .catch((): void => {
      res.send({ error: 'No sensors found' })
    })
})

deviceRouter.route('/sensors/:code').get((req: Request, res: Response): void => {
  deviceController
    .getSensorByCode(req.params.code)
    .then((sensor: Sensor): void => {
      res.send(sensor)
    })
    .catch((): void => {
      res.send({ error: 'Sensor not found' })
    })
})

deviceRouter.route('/capturing').get((_req: Request, res: Response): void => {
  deviceController
    .getCapturingDevices()
    .then((devices: Device[]): void => {
      res.status(HttpStatusCode.OK).send(devices)
    })
    .catch((): void => {
      res.send({ error: 'No capturing devices found' })
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
    .catch((): void => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: 'Camera not created' })
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
    .catch((): void => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: 'Sensor not created' })
    })
})

deviceRouter.route('/cameras').put((req: Request, res: Response): void => {
  deviceController
    .updateCamera(
      deviceIdFactory.createCameraId(req.body.code),
      req.body.isCapturing,
      req.body.ipAddress,
      resolutionFactory.createResolution(req.body.resolution.width, req.body.resolution.height)
    )
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Camera correctly updated' })
    })
    .catch((): void => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: 'Camera not updated' })
    })
})

deviceRouter.route('/sensors').put((req: Request, res: Response): void => {
  deviceController
    .updateSensor(
      deviceIdFactory.createSensorId(req.body.code),
      req.body.isCapturing,
      req.body.ipAddress,
      req.body.intervalMillis,
      req.body.measures as Measure[]
    )
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Sensor correctly updated' })
    })
    .catch((err): void => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: 'Sensor not updated' })
    })
})

deviceRouter.route('/cameras/:code').delete((req: Request, res: Response): void => {
  deviceController
    .deleteCamera(req.params.code)
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Sensor correctly deleted' })
    })
    .catch((): void => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: 'Sensor not deleted' })
    })
})

deviceRouter.route('/sensors/:code').delete((req: Request, res: Response): void => {
  deviceController
    .deleteSensor(req.params.code)
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Camera correctly deleted' })
    })
    .catch((): void => {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: 'Camera not deleted' })
    })
})
