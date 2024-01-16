import { DeviceId } from '../core/DeviceId.js'
import { Measure } from '../core/impl/enum/Measure.js'
import { EnvironmentData } from '../core/EnvironmentData.js'
import { MeasureUnit } from '../core/impl/enum/MeasureUnit'

export interface EnvironmentDataFactory {
  createEnvironmentData(
    sourceDeviceId: DeviceId,
    value: number,
    measure: Measure,
    unit: MeasureUnit,
    timestamp: Date
  ): EnvironmentData
}
