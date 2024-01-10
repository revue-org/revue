import express, { Request, Response, Router } from 'express'
import { deviceController } from '../controller/device.js'
import { Camera } from '@domain/device/core/Camera'
import { Sensor } from '@domain/device/core/Sensor'
import { userController } from "../controller/user";
import { User } from "@domain/monitoring/core/User";
import { userRouter } from "./user";

export const deviceRouter: Router = express.Router()

deviceRouter.route('/cameras').get((req: Request, res: Response) => {
  deviceController
    .getCameras()
    .then((cameras: Camera[]): void => {
      res.send(cameras)
    })
    .catch((): void => {
      res.send({ error: 'No cameras found' })
    })
})
deviceRouter.route('/sensors').get((req: Request, res: Response) => {
  deviceController
    .getSensors()
    .then((sensors: Sensor[]): void => {
      res.send(sensors)
    })
    .catch((): void => {
      res.send({ error: 'No sensors found' })
    })
})

//TODO: metto un get con l'id tra i params, quindi nell'url ?
userRouter.route('/:id').get((req: Request, res: Response): void => {
  userController
    .getUser(req)
    .then((user: User): void => {
      res.send(user)
    })
    .catch((): void => {
      res.send({ error: 'User not found' })
    })
})

deviceRouter.route('/').post((req: Request, res: Response) => {
  deviceController
    .createDevice(req)
    .then((): void => {
      res.send({ success: 'Device created' })
    })
    .catch(() => {
      res.send({ error: 'Device not created' })
    })
})

deviceRouter.route('/').put((req: Request, res: Response) => {
  deviceController
    .updateDevice(req)
    .then((): void => {
      res.send({ success: 'Device correctly updated' })
    })
    .catch((): void => {
      res.send({ error: 'Device not updated' })
    })
})

deviceRouter.route('/').delete((req: Request, res: Response) => {
  //deviceController.deleteDevice(req)
})
