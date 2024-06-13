import { DeviceCapability } from './DeviceCapability'

interface SensoringCapability extends DeviceCapability {
  readonly type: 'sensor'
  readonly capturingInterval: number
  readonly measureType: MeasureType
}
