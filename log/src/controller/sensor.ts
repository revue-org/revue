import { EnvironmentData } from '@domain/device/core/EnvironmentData.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { DeviceType } from 'domain/dist/domain/device/core/impl/enum/DeviceType.js'
import { logService } from '../../src/init.js'

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

export const sensorController = {
  getDataBySensorCode: async (code: string): Promise<EnvironmentData[]> => {
    return await logService.getDataBySensorId(deviceIdFactory.createId(DeviceType.SENSOR, code))
  },
  getLatestDataBySensorCode(code: string, quantity: number): Promise<EnvironmentData[]> {
    return logService.getLatestDataBySensorId(deviceIdFactory.createId(DeviceType.SENSOR, code), quantity)
  }
}
