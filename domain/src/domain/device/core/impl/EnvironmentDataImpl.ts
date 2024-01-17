import { EnvironmentData } from '../EnvironmentData.js'
import { DeviceId } from '../DeviceId.js'
import { Measure } from './enum/Measure.js'
import { MeasureUnit } from './enum/MeasureUnit.js'

export class EnvironmentDataImpl implements EnvironmentData {
  private _sourceDeviceId: DeviceId
  private _value: number
  private _measure: Measure
  private _measureUnit: MeasureUnit
  private readonly _timestamp: Date

  constructor(
    sourceDeviceId: DeviceId,
    value: number,
    measure: Measure,
    unit: MeasureUnit,
    timestamp: Date
  ) {
    this._sourceDeviceId = sourceDeviceId
    this._value = value
    this._measure = measure
    this._measureUnit = unit
    this._timestamp = timestamp
  }

  get sourceDeviceId(): DeviceId {
    return this._sourceDeviceId
  }

  set sourceDeviceId(sourceDeviceId: DeviceId) {
    this._sourceDeviceId = sourceDeviceId
  }

  get value(): number {
    return this._value
  }

  set value(value: number) {
    this._value = value
  }

  get measure(): Measure {
    return this._measure
  }

  set measure(measure: Measure) {
    this._measure = measure
  }

  get measureUnit(): MeasureUnit {
    return this._measureUnit
  }
  set measureUnit(unit: MeasureUnit) {
    this._measureUnit = unit
  }

  get timestamp(): Date {
    return this._timestamp
  }

}
