import { EnvironmentDataFactory } from '../EnvironmentDataFactory.js'
import { DeviceId } from '../../core/DeviceId.js'
import { Measure } from '../../core/impl/enum/Measure.js'
import { EnvironmentDataImpl } from '../../core/impl/EnvironmentDataImpl'
import { EnvironmentData } from '../../core/EnvironmentData'

export class EnvironmentDataFactoryImpl implements EnvironmentDataFactory {
  createEnvironmentData(
    sourceDeviceId: DeviceId,
    value: number,
    measure: Measure
  ): EnvironmentData {
    return new EnvironmentDataImpl(sourceDeviceId, value, measure, new Date())
  }

  createTimedEnvironmentData(
    sourceDeviceId: DeviceId,
    value: number,
    measure: Measure,
    timestamp: Date
  ): EnvironmentData {
    return new EnvironmentDataImpl(sourceDeviceId, value, measure, timestamp)
  }
}