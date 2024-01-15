import type { Request } from 'express'
import { Model, model } from 'mongoose'
import { exceedingSchema } from '@storage/anomaly/schemas/ExceedingSchema.js'
import { intrusionSchema } from '@storage/anomaly/schemas/IntrusionSchema.js'
import { AnomalyRepositoryImpl } from '@storage/anomaly/AnomalyRepositoryImpl.js'
import { AnomalyFactoryImpl } from '@domain/anomaly/factories/impl/AnomalyFactoryImpl.js'
import { Exceeding } from '@domain/anomaly/core/Exceeding.js'
import { Intrusion } from '@domain/anomaly/core/Intrusion.js'
import { AnomalyType } from '@domain/anomaly/core/impl/enum/AnomalyType.js'
import { AnomalyFactory } from '@domain/anomaly/factories/AnomalyFactory.js'
import { AnomalyRepository } from '@domain/anomaly/repositories/AnomalyRepository.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { AnomalyTypeConverter } from '@utils/AnomalyTypeConverter.js'
import { MeasureConverter } from '@utils/MeasureConverter.js'
import { ObjectClassConverter } from '@utils/ObjectClassConverter.js'
import { Anomaly } from 'domain/dist/domain/anomaly/core/Anomaly'

const exceedingModel: Model<Exceeding> = model<Exceeding>('Exceeding', exceedingSchema, 'anomaly')
const intrusionModel: Model<Intrusion> = model<Intrusion>('Intrusion', intrusionSchema, 'anomaly')

const anomalyManager: AnomalyRepository = new AnomalyRepositoryImpl(exceedingModel, intrusionModel)
const anomalyFactory: AnomalyFactory = new AnomalyFactoryImpl()

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

export const anomalyController = {
  getAnomalyById: async (id: string): Promise<Anomaly> => {
    return await anomalyManager.getAnomalyById(id)
  },
  getExceedings: async (): Promise<Exceeding[]> => {
    return await anomalyManager.getExceedings()
  },
  getIntrusions: async (): Promise<Intrusion[]> => {
    return await anomalyManager.getIntrusions()
  },
  createAnomaly: async (req: Request): Promise<void> => {
    if (req.body.type === undefined) {
      throw new Error('No type present in request body')
    }
    switch (AnomalyTypeConverter.convertToAnomalyType(req.body.type)) {
      case AnomalyType.EXCEEDING:
        return await anomalyManager.insertAnomaly(
          anomalyFactory.createExceeding(
            '',
            deviceIdFactory.createId(req.body.deviceId.type, req.body.deviceId.code),
            new Date(),
            req.body.value,
            MeasureConverter.convertToMeasure(req.body.measure)
          )
        )
      case AnomalyType.INTRUSION:
        return await anomalyManager.insertAnomaly(
          anomalyFactory.createIntrusion(
            '',
            deviceIdFactory.createId(req.body.deviceId.type, req.body.deviceId.code),
            new Date(),
            ObjectClassConverter.convertToObjectClass(req.body.intrusionObject)
          )
        )
      default:
        throw new Error('Error while creating anomaly')
    }
  },
  updateAnomaly: async (req: Request): Promise<void> => {
    if (req.body.type === undefined) {
      throw new Error('No type present in request body')
    }
    switch (AnomalyTypeConverter.convertToAnomalyType(req.body.type)) {
      case AnomalyType.EXCEEDING:
        return await anomalyManager.updateAnomaly(
          anomalyFactory.createExceeding(
            req.body.id,
            deviceIdFactory.createId(req.body.deviceId.type, req.body.deviceId.code),
            req.body.timestamp,
            req.body.value,
            MeasureConverter.convertToMeasure(req.body.measure)
          )
        )
      case AnomalyType.INTRUSION:
        return await anomalyManager.updateAnomaly(
          anomalyFactory.createIntrusion(
            req.body.id,
            deviceIdFactory.createId(req.body.deviceId.type, req.body.deviceId.code),
            req.body.timestamp,
            ObjectClassConverter.convertToObjectClass(req.body.intrusionObject)
          )
        )
      default:
        throw new Error('Error while creating anomaly')
    }
  },
  deleteAnomaly: async (id: string, type: string): Promise<void> => {
    await anomalyManager.deleteAnomaly(
      id,
      AnomalyTypeConverter.convertToAnomalyType(type)
    )
  }
}
