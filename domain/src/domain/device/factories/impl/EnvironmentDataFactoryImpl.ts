import { EnvironmentDataFactory } from '../EnvironmentDataFactory.js'
import { DeviceId } from '../../core/DeviceId.js'
import { Measure } from '../../core/impl/enum/Measure.js'
import { EnvironmentDataImpl } from '../../core/impl/EnvironmentDataImpl.js'
import { EnvironmentData } from '../../core/EnvironmentData.js'
import { MeasureUnit } from '../../core/impl/enum/MeasureUnit'

export class EnvironmentDataFactoryImpl implements EnvironmentDataFactory {
  createEnvironmentData(
    sourceDeviceId: DeviceId,
    value: number,
    measure: Measure,
    unit: MeasureUnit,
    timestamp: Date
  ): EnvironmentData {
    return new EnvironmentDataImpl(sourceDeviceId, value, measure, unit, timestamp)
  }
}
