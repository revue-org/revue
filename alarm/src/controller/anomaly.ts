import { Model, model } from 'mongoose'
import { exceedingSchema } from '@storage/anomaly/schemas/ExceedingSchema.js'
import { intrusionSchema } from '@storage/anomaly/schemas/IntrusionSchema.js'
import { AnomalyRepositoryImpl } from '@storage/anomaly/AnomalyRepositoryImpl.js'
import { AnomalyFactoryImpl } from '@domain/anomaly/factories/impl/AnomalyFactoryImpl.js'
import { Exceeding } from '@domain/anomaly/core/Exceeding.js'
import { Intrusion } from '@domain/anomaly/core/Intrusion.js'
import { AnomalyFactory } from '@domain/anomaly/factories/AnomalyFactory.js'
import { AnomalyRepository } from '@domain/anomaly/repositories/AnomalyRepository.js'
import { AnomalyTypeConverter } from '@utils/AnomalyTypeConverter.js'
import { Anomaly } from '@domain/anomaly/core/Anomaly.js'
import { DeviceId } from '@domain/device/core/DeviceId.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { ObjectClass } from 'domain/dist/domain/security-rule/core/impl/enum/ObjectClass.js'

const exceedingModel: Model<Exceeding> = model<Exceeding>('Exceeding', exceedingSchema, 'anomaly')
const intrusionModel: Model<Intrusion> = model<Intrusion>('Intrusion', intrusionSchema, 'anomaly')

const anomalyManager: AnomalyRepository = new AnomalyRepositoryImpl(exceedingModel, intrusionModel)
const anomalyFactory: AnomalyFactory = new AnomalyFactoryImpl()

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
  createExceeding: async (deviceId: DeviceId, measure: Measure, value: number): Promise<void> => {
    return await anomalyManager.insertExceeding(
      anomalyFactory.createExceeding('', deviceId, new Date(), measure, value)
    )
  },
  createIntrusion: async (deviceId: DeviceId, intrusionObject: ObjectClass): Promise<void> => {
    return await anomalyManager.insertIntrusion(
      anomalyFactory.createIntrusion('', deviceId, new Date(), intrusionObject)
    )
  },
  updateExceeding(
    id: string,
    deviceId: DeviceId,
    timestamp: Date,
    measure: Measure,
    value: number
  ): Promise<void> {
    console.log(anomalyFactory.createExceeding(id, deviceId, timestamp, measure, value))
    return anomalyManager.updateAnomaly(
      anomalyFactory.createExceeding(id, deviceId, timestamp, measure, value)
    )
  },
  updateIntrusion(
    id: string,
    deviceId: DeviceId,
    timestamp: Date,
    intrusionObject: ObjectClass
  ): Promise<void> {
    return anomalyManager.updateAnomaly(
      anomalyFactory.createIntrusion(id, deviceId, timestamp, intrusionObject)
    )
  },
  deleteAnomaly: async (id: string, type: string): Promise<void> => {
    await anomalyManager.deleteAnomaly(id, AnomalyTypeConverter.convertToAnomalyType(type))
  }
}
