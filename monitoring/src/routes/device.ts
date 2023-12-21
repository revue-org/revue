import { deviceController } from '../controller/device.js'
import express, { Request, Response } from 'express'

export const deviceRouter = express.Router()

deviceRouter.route('/').post((req: Request, res: Response) => {
  deviceController.createDevice(req, res)
})
deviceRouter.route('/').put((req: Request, res: Response) => {
  deviceController.updateDevice(req, res)
})
deviceRouter.route('/cameras').get((req: Request, res: Response) => {
  deviceController.getCameras(req, res)
})
deviceRouter.route('/sensors').get((req: Request, res: Response) => {
  deviceController.getSensors(req, res)
})
