import type { Request, Response } from 'express'
import { userSchema } from 'domain/dist/storage/monitoring/schemas/UserSchema'
import { MyMonitoringRepository } from 'domain/dist/storage/monitoring/MyMonitoringRepository'
import { Model, model } from 'mongoose'
import { UserImpl } from 'domain/dist/domain/monitoring/core/impl/UserImpl'
//import { jwtManager } from '../utils/JWTManager'
export const deviceController = {
  getCameras: async (req: Request, res: Response) => {
    // res.json(monitoringManager.getAllCameras())
  },
  getSensors: async (req: Request, res: Response) => {
    // res.json(monitoringManager.getAllSensors())
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
