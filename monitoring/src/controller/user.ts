import type { Request, Response } from 'express'

import { MonitoringManager } from 'domain/dist/storage/monitoring/MonitoringManager.js'

const monitoringManager: MonitoringManager = new MonitoringManager()
export const userController = {
  getAllUsers: async (req: Request, res: Response) => {
    res.json(monitoringManager.getAllUsers())
  },

  getUser: async (req: Request, res: Response) => {
    /*try {
      res.json(await deviceModel.findById(req.params.id))
    } catch (err) {
      console.log(err)
    }*/
  },

  createUser: async (req: Request, res: Response) => {
    /*try {
      res.json(await deviceModel.findById(req.params.id))
    } catch (err) {
      console.log(err)
    }
    deviceModel.create({})*/
  },

  updateUser: async (req: Request, res: Response) => {
  }
}
