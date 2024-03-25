import { EnvironmentData } from '@domain/device/core/EnvironmentData.js'
import { EnvironmentDataFactory } from '@domain/device/factories/EnvironmentDataFactory.js'
import { EnvironmentDataFactoryImpl } from '@domain/device/factories/impl/EnvironmentDataFactoryImpl.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { DeviceId } from 'domain/dist/domain/device/core/DeviceId.js'
import { MeasureUnit } from 'domain/dist/domain/device/core/impl/enum/MeasureUnit.js'
import { DeviceType } from 'domain/dist/domain/device/core/impl/enum/DeviceType.js'
import { logService } from '../../src/init.js'

const environmentDataFactory: EnvironmentDataFactory = new EnvironmentDataFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

export const environmentDataController = {
  getEnvironmentData: async (): Promise<EnvironmentData[]> => {
    return await logService.getEnvironmentData()
  },
  getDataByDeviceId: async (type: DeviceType, code: string): Promise<EnvironmentData[]> => {
    return await logService.getDataByDeviceId(deviceIdFactory.createId(type, code))
  },
  createEnvironmentData: async (
    deviceId: DeviceId,
    value: number,
    measure: Measure,
    measureUnit: MeasureUnit,
    timestamp: Date
  ): Promise<void> => {
    return logService.insertEnvironmentData(
      environmentDataFactory.createEnvironmentData(deviceId, value, measure, measureUnit, timestamp)
    )
  }
}
