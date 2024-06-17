import { DeviceCapability } from './DeviceCapability'
import { MeasureType } from '@common/domain/core/MeasureType'

interface SensoringCapability extends DeviceCapability {
  readonly type: 'sensor'
  readonly capturingInterval: number
  readonly measureType: MeasureType
}
