import { DeviceEvent } from './DeviceEvent'
import { MeasureType } from './MeasureType'
import { Measure } from './Measure'

export interface Measurement extends DeviceEvent {
  readonly measure: Measure

  readonly value: any
}
