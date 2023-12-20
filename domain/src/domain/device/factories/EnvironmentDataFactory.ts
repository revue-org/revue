import { DeviceId } from '../core/DeviceId'
import { Measure } from '../core/impl/enum/Measure'
import { EnvironmentData } from '../core/EnvironmentData'

export interface EnvironmentDataFactory {
  createEnvironmentData(sourceDeviceId: DeviceId, value: number, measure: Measure): EnvironmentData

  createTimedEnvironmentData(
    sourceDeviceId: DeviceId,
    value: number,
    measure: Measure,
    timestamp: Date
  ): EnvironmentData
}
