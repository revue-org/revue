import express, { Request, Response, Router } from 'express'
import { deviceController } from '../controller/device.js'
import { Camera } from '@domain/device/core/Camera.js'
import { Sensor } from '@domain/device/core/Sensor.js'
import { Device } from 'domain/dist/domain/device/core/Device.js'

export const deviceRouter: Router = express.Router()

deviceRouter.route('/:type&:code').get((req: Request, res: Response): void => {
  deviceController
    .getDeviceById(req.params.type, req.params.code)
    .then((device: Device): void => {
      res.send(device)
    })
    .catch((): void => {
      res.send({ error: 'Device not found' })
    })
})

deviceRouter.route('/cameras').get((req: Request, res: Response): void => {
  deviceController
    .getCameras()
    .then((cameras: Camera[]): void => {
      res.send(cameras)
    })
    .catch((): void => {
      res.send({ error: 'No cameras found' })
    })
})
deviceRouter.route('/sensors').get((req: Request, res: Response): void => {
  deviceController
    .getSensors()
    .then((sensors: Sensor[]): void => {
      res.send(sensors)
    })
    .catch((): void => {
      res.send({ error: 'No sensors found' })
    })
})

deviceRouter.route('/').post((req: Request, res: Response): void => {
  deviceController
    .createDevice(req)
    .then((): void => {
      res.send({ success: 'Device created' })
    })
    .catch(() => {
      res.send({ error: 'Device not created' })
    })
})

deviceRouter.route('/').put((req: Request, res: Response): void => {
  deviceController
    .updateDevice(req)
    .then((): void => {
      res.send({ success: 'Device correctly updated' })
    })
    .catch((): void => {
      res.send({ error: 'Device not updated' })
    })
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
