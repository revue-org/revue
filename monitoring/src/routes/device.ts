import express, { Request, Response, Router } from 'express'
import { deviceController } from '@/controller/device.js'
import { Camera } from '@domain/device/core/Camera.js'
import { Sensor } from '@domain/device/core/Sensor.js'
import { DeviceTypeConverter } from '@utils/DeviceTypeConverter.js'
import { DeviceType } from '@domain/device/core/impl/enum/DeviceType.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { ResolutionFactory } from '@domain/device/factories/ResolutionFactory.js'
import { ResolutionFactoryImpl } from '@domain/device/factories/impl/ResolutionFactoryImpl.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'

export const deviceRouter: Router = express.Router()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()

deviceRouter.route('/cameras').get((_req: Request, res: Response): void => {
  deviceController
    .getCameras()
    .then((cameras: Camera[]): void => {
      res.send(cameras)
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
      res.send(sensors)
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

deviceRouter.route('/').post((req: Request, res: Response): void => {
  switch (DeviceTypeConverter.convertToDeviceType(req.body.type)) {
    case DeviceType.CAMERA:
      deviceController
        .createCamera(
          deviceIdFactory.createCameraId(req.body.code),
          req.body.ipAddress,
          resolutionFactory.createResolution(req.body.resolutionWidth, req.body.resolutionHeight)
        )
        .then((): void => {
          res.send({ success: 'Camera created' })
        })
        .catch(() => {
          res.send({ error: 'Camera not created' })
        })
      break
    case DeviceType.SENSOR:
      deviceController
        .createSensor(
          deviceIdFactory.createSensorId(req.body.code),
          req.body.ipAddress,
          req.body.intervalMillis,
          req.body.measures as Measure[]
        )
        .then((): void => {
          res.send({ success: 'Sensor created' })
        })
        .catch(() => {
          res.send({ error: 'Sensor not created' })
        })
      break
  }
})

deviceRouter.route('/').put((req: Request, res: Response): void => {
  switch (DeviceTypeConverter.convertToDeviceType(req.body.type)) {
    case DeviceType.CAMERA:
      deviceController
        .updateCamera(
          deviceIdFactory.createCameraId(req.body.code),
          req.body.ipAddress,
          resolutionFactory.createResolution(req.body.resolutionWidth, req.body.resolutionHeight)
        )
        .then((): void => {
          res.send({ success: 'Camera correctly updated' })
        })
        .catch((): void => {
          res.send({ error: 'Camera not updated' })
        })
      break
    case DeviceType.SENSOR:
      deviceController
        .updateSensor(
          deviceIdFactory.createSensorId(req.body.code),
          req.body.ipAddress,
          req.body.intervalMillis,
          req.body.measures as Measure[]
        )
        .then((): void => {
          res.send({ success: 'Sensor correctly updated' })
        })
        .catch((): void => {
          res.send({ error: 'Sensor not updated' })
        })
      break
  }
})

deviceRouter.route('/').delete((req: Request, res: Response): void => {
  deviceController
    .deleteDevice(req.body.type, req.body.code)
    .then((): void => {
      res.send({ success: 'Device correctly deleted' })
    })
    .catch((): void => {
      res.send({ error: 'Device not deleted' })
    })
})
