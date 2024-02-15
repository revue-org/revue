import { Model, model } from 'mongoose'
import { EnvironmentData } from '@domain/device/core/EnvironmentData.js'
import { EnvironmentDataRepository } from '@domain/device/repositories/EnvironmentDataRepository.js'
import { EnvironmentDataRepositoryImpl } from '@storage/device/EnvironmentDataRepositoryImpl.js'
import { EnvironmentDataFactory } from '@domain/device/factories/EnvironmentDataFactory.js'
import { EnvironmentDataFactoryImpl } from '@domain/device/factories/impl/EnvironmentDataFactoryImpl.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { DeviceId, DeviceType, MeasureUnit } from 'domain/dist/domain/device/core'
import { environmentDataSchema } from '@storage/device/schemas/EnvironmentDataSchema.js'

export const environmentDataModel: Model<EnvironmentData> = model<EnvironmentData>(
  'EnvironmentData',
  environmentDataSchema,
  'measurements'
)
const environmentDataManager: EnvironmentDataRepository = new EnvironmentDataRepositoryImpl(
  environmentDataModel
)
const environmentDataFactory: EnvironmentDataFactory = new EnvironmentDataFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

export const environmentDataController = {
  getEnvironmentData: async (): Promise<EnvironmentData[]> => {
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
    //TODO to check the measure unit and convert the value if necessary
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
