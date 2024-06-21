import { DeviceEvent } from './DeviceEvent'
import { Measure } from './Measure'

export interface Measurement extends DeviceEvent {
  readonly type: "measurement"
  readonly measure: Measure
  readonly value: any
}
