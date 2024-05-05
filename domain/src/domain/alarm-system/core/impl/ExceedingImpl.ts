import { Exceeding } from '../Exceeding.js'
import { DeviceId } from '../../../device/core/DeviceId.js'
import { Measure } from '../../../device/core/impl/enum/Measure.js'

export class ExceedingImpl implements Exceeding {
  private _anomalyId: string
  private _deviceId: DeviceId
  private readonly _timestamp: Date
  private readonly _value: number
  private readonly _measure: Measure

  constructor(anomalyId: string, deviceId: DeviceId, timestamp: Date, measure: Measure, value: number) {
    this._anomalyId = anomalyId
    this._deviceId = deviceId
    this._timestamp = timestamp
    this._measure = measure
    this._value = value
  }

  get anomalyId(): string {
    return this._anomalyId
  }

  set anomalyId(anomalyId: string) {
    this._anomalyId = anomalyId
  }

  get deviceId(): DeviceId {
    return this._deviceId
  }

  set deviceId(deviceId: DeviceId) {
    this._deviceId = deviceId
  }

  get timestamp(): Date {
    return this._timestamp
  }

  get value(): number {
    return this._value
  }

  get measure(): Measure {
    return this._measure
  }

}
