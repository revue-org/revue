import type { Request, Response } from 'express'
import { Model, model } from 'mongoose'
import { cameraSchema } from 'domain/dist/storage/device/schemas/CameraSchema'
import { sensorSchema } from 'domain/dist/storage/device/schemas/SensorSchema'
import { CameraImpl } from 'domain/dist/domain/device/core/impl/CameraImpl'
import { SensorImpl } from 'domain/dist/domain/device/core/impl/SensorImpl'
import { DeviceRepositoryImpl } from 'domain/dist/storage/device/DeviceRepositoryImpl'

const cameraModel: Model<CameraImpl> = model<CameraImpl>('CameraImpl', cameraSchema, 'device')
const sensorModel: Model<SensorImpl> = model<SensorImpl>('SensorImpl', sensorSchema, 'device')
const deviceManager: DeviceRepositoryImpl = new DeviceRepositoryImpl(cameraModel, sensorModel)

export const deviceController = {
  getCameras: async (req: Request, res: Response) => {
    res.json(await deviceManager.getCameras())
    //console.log(req.body.username)
    //console.log("ci sono")
      //res.send("ok")
  },
  getSensors: async (req: Request, res: Response) => {
    res.json(await deviceManager.getSensors())
  },
  getDevice: async (req: Request, res: Response) => {
    /*try {
      res.json(await deviceModel.findById(req.params.id))
    } catch (err) {
      console.log(err)
    }*/
  },
  createDevice: async (req: Request, res: Response) => {
    /*try {
      res.json(await deviceModel.findById(req.params.id))
    } catch (err) {
      console.log(err)
    }
    deviceModel.create({})*/
  },
  updateDevice: async (req: Request, res: Response) => {}
}
