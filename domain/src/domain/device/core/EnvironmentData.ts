import { DeviceId } from './DeviceId.js'
import { Measure } from './impl/enum/Measure.js'

export interface EnvironmentData {
  get sourceDeviceId(): DeviceId

  set sourceDeviceId(sourceDeviceId: DeviceId)

  get value(): number

  set value(value: number)

  get measure(): Measure

  set measure(measure: Measure)

  get timestamp(): Date

  set timestamp(timestamp: Date)
}
