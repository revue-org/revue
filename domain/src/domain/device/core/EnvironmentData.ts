import { DeviceId } from './DeviceId.js'
import { Measure } from './impl/enum/Measure.js'
import { MeasureUnit } from './impl/enum/MeasureUnit'

export interface EnvironmentData {
  get id(): string

  set id(id: string)

  get sourceDeviceId(): DeviceId

  set sourceDeviceId(sourceDeviceId: DeviceId)

  get value(): number

  set value(value: number)

  get measure(): Measure

  set measure(measure: Measure)

  get measureUnit(): MeasureUnit

  set measureUnit(unit: MeasureUnit)

  get timestamp(): Date
}
