import { DeviceCapability } from './DeviceCapability'
import { Measure } from '@common/domain/core'

interface SensoringCapability extends DeviceCapability {
  readonly type: 'sensor'
  readonly capturingInterval: number
  readonly measure: Measure
}
