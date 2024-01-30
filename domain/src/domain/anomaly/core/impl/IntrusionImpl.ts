import { DeviceId } from '../../../device/core/DeviceId.js'
import { ObjectClass } from '../../../security-rule/core/impl/enum/ObjectClass.js'
import { Intrusion } from '../Intrusion.js'

export class IntrusionImpl implements Intrusion {
  private _anomalyId: string
  private _deviceId: DeviceId
  private readonly _timestamp: Date
  private _intrusionObject: ObjectClass

  constructor(anomalyId: string, deviceId: DeviceId, timestamp: Date, intrusionObject: ObjectClass) {
    this._anomalyId = anomalyId
    this._deviceId = deviceId
    this._timestamp = timestamp
    this._intrusionObject = intrusionObject
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

  get intrusionObject(): ObjectClass {
    return this._intrusionObject
  }

  set intrusionObject(intrusionObject: ObjectClass) {
    this._intrusionObject = intrusionObject
  }
}
