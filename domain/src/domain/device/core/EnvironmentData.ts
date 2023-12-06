import { DeviceId } from './DeviceId'
import { Measure } from './Measure'

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
