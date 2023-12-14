import type { Request, Response } from 'express'
import { Model, model } from 'mongoose'
import { anomalySchema } from 'domain/dist/storage/anomaly/schemas/AnomalySchema.js'
import { Anomaly } from 'domain/dist/domain/anomaly/core/Anomaly'

const anomalyModel: Model<Anomaly> = model<Anomaly>('Anomaly', anomalySchema, 'anomaly')
const anomalyManager: AnomalyRepositoryImpl = new AnomalyRepositoryImpl(anomalyModel)
const notificationFactory: AnomalyFactoryImpl = new AnomalyFactoryImpl()

export const anomalyController = {
  getAnomalies: async (req: Request, res: Response) => {
    res.json('ok')
  },
  getAnomaly: async (req: Request, res: Response) => {
    res.json('ok')
  },
  createAnomaly: async (req: Request, res: Response) => {
    res.json('ok')
  },
  updateAnomaly: async (req: Request, res: Response) => {
    res.json('ok')
  },
  deleteAnomaly: async (req: Request, res: Response) => {
    res.json('ok')
  }
}
