import express, { Request, Response, Router } from "express";
import { Device } from '@domain/device/core/Device'
import { deviceController } from '../controller/device.js'

export const deviceRouter: Router = express.Router()

deviceRouter.route('/cameras').get((req: Request, res: Response) => {
  deviceController.getCameras()
})
deviceRouter.route('/sensors').get((req: Request, res: Response) => {
  deviceController.getSensors()
})

deviceRouter.route('/').post((req: Request, res: Response) => {
  deviceController.createDevice(req)
})

deviceRouter.route('/').put((req: Request, res: Response) => {
  deviceController.updateDevice(req)
})

deviceRouter.route('/').delete((req: Request, res: Response) => {
  //deviceController.deleteDevice(req)
})

