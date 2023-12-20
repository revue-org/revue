import { EnvironmentData } from '../EnvironmentData.js'
import { DeviceId } from '../DeviceId.js'
import { Measure } from './enum/Measure.js'

export class EnvironmentDataImpl implements EnvironmentData {
  private _sourceDeviceId: DeviceId
  private _value: number
  private _measure: Measure
  private _timestamp: Date

  constructor(sourceDeviceId: DeviceId, value: number, measure: Measure, timestamp: Date) {
    this._sourceDeviceId = sourceDeviceId
    this._value = value
    this._measure = measure
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

  get timestamp(): Date {
    return this._timestamp
  }

  set timestamp(timestamp: Date) {
    this._timestamp = timestamp
  }
}
