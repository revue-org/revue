import { EnvironmentData } from '../EnvironmentData.js'
import { DeviceId } from '../DeviceId.js'
import { Measure } from './enum/Measure.js'
import { MeasureUnit } from './enum/MeasureUnit.js'

export class EnvironmentDataImpl implements EnvironmentData {
  private readonly _sourceDeviceId: DeviceId
  private readonly _value: number
  private readonly _measure: Measure
  private readonly _measureUnit: MeasureUnit
  private readonly _timestamp: Date

  constructor(sourceDeviceId: DeviceId, value: number, measure: Measure, unit: MeasureUnit, timestamp: Date) {
    this._sourceDeviceId = sourceDeviceId
    this._value = value
    this._measure = measure
    this._measureUnit = unit
    this._timestamp = timestamp
  }

  get sourceDeviceId(): DeviceId {
    return this._sourceDeviceId
  }
  get value(): number {
    return this._value
  }

  get measure(): Measure {
    return this._measure
  }
  get measureUnit(): MeasureUnit {
    return this._measureUnit
  }

  get timestamp(): Date {
    return this._timestamp
  }
}
