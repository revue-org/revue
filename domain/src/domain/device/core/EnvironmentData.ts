import { DeviceId } from './DeviceId.js'
import { Measure } from './impl/enum/Measure.js'
import { MeasureUnit } from './impl/enum/MeasureUnit'

export interface EnvironmentData {
  get sourceDeviceId(): DeviceId

  set sourceDeviceId(sourceDeviceId: DeviceId)

  get value(): number

  set value(value: number)

  get measure(): Measure

  set measure(measure: Measure)

  get timestamp(): Date

  get unit(): MeasureUnit

  set unit(unit: MeasureUnit)
}
