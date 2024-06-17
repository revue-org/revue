import { DeviceEvent } from './DeviceEvent'
import { MeasureType } from './MeasureType'

export interface Measurement extends DeviceEvent {
  readonly measureType: MeasureType

  readonly value: any
}
