import type { Request, Response } from 'express'
import { MonitoringManager } from 'storage/monitoring/MonitoringManager.js'

const monitoringManager: MonitoringManager = new MonitoringManager()
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
  updateDevice: async (req: Request, res: Response) => {
  }
}
