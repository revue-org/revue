import { Model, model } from 'mongoose'
import { Intrusion } from '@domain/anomaly/core/Intrusion.js'
import { AnomalyRepository } from '@domain/anomaly/repositories/AnomalyRepository.js'
import { AnomalyRepositoryImpl } from '@storage/anomaly/AnomalyRepositoryImpl.js'
import { EnvironmentDataFactory } from '@domain/device/factories/EnvironmentDataFactory.js'
import { EnvironmentDataFactoryImpl } from '@domain/device/factories/impl/EnvironmentDataFactoryImpl.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { DeviceId } from 'domain/dist/domain/device/core/DeviceId.js'
import { MeasureUnit } from 'domain/dist/domain/device/core/impl/enum/MeasureUnit.js'
import { DeviceType } from 'domain/dist/domain/device/core/impl/enum/DeviceType.js'
import { intrusionSchema } from '@storage/anomaly/schemas/IntrusionSchema.js'

export const intrusionModel: Model<Intrusion> = model<Intrusion>(
  'Intrusion',
  intrusionSchema,
  'detection'
)
const detectionManager: AnomalyRepository = new AnomalyRepositoryImpl(
  undefined,
  intrusionModel
)
const environmentDataFactory: EnvironmentDataFactory = new EnvironmentDataFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

export const detectionController = {
  getDetections: async (): Promise<Intrusion[]> => {
    return await environmentDataManager.getEnvironmentData()
  },
  getDataByDeviceId: async (type: DeviceType, code: string): Promise<EnvironmentData[]> => {
    return await environmentDataManager.getDataByDeviceId(deviceIdFactory.createId(type, code))
  },
  createEnvironmentData: async (
    deviceId: DeviceId,
    value: number,
    measure: Measure,
    measureUnit: MeasureUnit,
    timestamp: Date
  ): Promise<void> => {
    return await environmentDataManager.insertEnvironmentData(
      environmentDataFactory.createEnvironmentData(deviceId, value, measure, measureUnit, timestamp)
    )
  },
  updateEnvironmentData: async (
    deviceId: DeviceId,
    value: number,
    measure: Measure,
    unit: MeasureUnit,
    timestamp: Date
  ): Promise<void> => {
    return await environmentDataManager.updateEnvironmentData(
      environmentDataFactory.createEnvironmentData(deviceId, value, measure, unit, timestamp)
    )
  },
  deleteEnvironmentData: async (id: string): Promise<void> => {
    return await environmentDataManager.deleteEnvironmentData(id)
  }
}
