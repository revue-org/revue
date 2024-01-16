import { DeviceId } from '../core/DeviceId.js'
import { Measure } from '../core/impl/enum/Measure.js'
import { EnvironmentData } from '../core/EnvironmentData.js'

export interface EnvironmentDataFactory {
  createEnvironmentData(sourceDeviceId: DeviceId, value: number, measure: Measure): EnvironmentData

  createTimedEnvironmentData(
    sourceDeviceId: DeviceId,
    value: number,
    measure: Measure,
    timestamp: Date
  ): EnvironmentData
}
