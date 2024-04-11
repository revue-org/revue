import { EnvironmentData } from '@domain/device/core/EnvironmentData.js'
import { EnvironmentDataFactory } from '@domain/device/factories/EnvironmentDataFactory.js'
import { EnvironmentDataFactoryImpl } from '@domain/device/factories/impl/EnvironmentDataFactoryImpl.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { DeviceId } from 'domain/dist/domain/device/core/DeviceId.js'
import { MeasureUnit } from 'domain/dist/domain/device/core/impl/enum/MeasureUnit.js'
import { logService } from '../../src/init.js'

const environmentDataFactory: EnvironmentDataFactory = new EnvironmentDataFactoryImpl()

export const environmentDataController = {
  getEnvironmentData: async (): Promise<EnvironmentData[]> => {
    return await logService.getEnvironmentData()
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
