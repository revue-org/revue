import { DeviceCapability } from './DeviceCapability'
import { Measure } from '@common/domain/core'
import { CapabilityType } from '@/domain/core/capabilities/CapabilityType'

export interface SensoringCapability extends DeviceCapability {
  readonly type: CapabilityType.SENSOR
  readonly capturingInterval: number
  readonly measure: Measure
}
