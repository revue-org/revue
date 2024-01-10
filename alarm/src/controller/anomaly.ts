import type { Request } from 'express'
import { Model, model } from 'mongoose'
import { exceedingSchema } from 'domain/dist/storage/anomaly/schemas/exceedingSchema.js'

import { intrusionSchema } from 'domain/dist/storage/anomaly/schemas/intrusionSchema.js'
import { AnomalyRepositoryImpl } from 'domain/dist/storage/anomaly/AnomalyRepositoryImpl.js'
import { AnomalyFactoryImpl } from 'domain/dist/domain/anomaly/factories/impl/AnomalyFactoryImpl.js'
import { Exceeding } from 'domain/dist/domain/anomaly/core/Exceeding.js'
import { Intrusion } from 'domain/dist/domain/anomaly/core/Intrusion.js'
import { AnomalyRepository } from 'domain/dist/domain/anomaly/repositories/AnomalyRepository.js'
import { AnomalyFactory } from 'domain/dist/domain/anomaly/factories/AnomalyFactory.js'

const exceedingModel: Model<Exceeding> = model<Exceeding>('Exceeding', exceedingSchema, 'anomaly')
const intrusionModel: Model<Intrusion> = model<Intrusion>('Intrusion', intrusionSchema, 'anomaly')

const anomalyManager: AnomalyRepository = new AnomalyRepositoryImpl(exceedingModel, intrusionModel)
const anomalyFactory: AnomalyFactory = new AnomalyFactoryImpl()

export const anomalyController = {
  getExceedings: async (): Promise<Exceeding[]> => {
    return await anomalyManager.getExceedings()
  },
  getIntrusions: async (): Promise<Intrusion[]> => {
    return await anomalyManager.getIntrusions()
  },
  createAnomaly: async (req: Request): Promise<void> => {
    let anomalyId: string = req.body.id
    if ((await anomalyManager.getAnomaly(anomalyId)) !== null) {
      throw new Error('Anomaly already present')
    }
  },
  updateAnomaly: async (req: Request): Promise<void> => {
    //res.json('ok')
  },
  deleteAnomaly: async (req: Request): Promise<void> => {
    //res.json('ok')
  }
}
