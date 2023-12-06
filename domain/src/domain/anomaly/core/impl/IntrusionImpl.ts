import { Exceeding } from '../Exceeding'
import { DeviceId } from '../../../device/core/DeviceId'
import { Measure } from '../../../device/core/impl/enum/Measure'
import { ObjectClass } from "../../../security-rule/core/impl/ObjectClass";
import { Intrusion } from "../Intrusion";

export class IntrusionImpl implements Intrusion {
  private _anomalyId: number
  private _deviceId: DeviceId
  private _timestamp: Date
  private _intrusionObject: ObjectClass

  constructor(
    anomalyId: number,
    deviceId: DeviceId,
    timestamp: Date,
    intrusionObject: ObjectClass
  ) {
    this._anomalyId = anomalyId
    this._deviceId = deviceId
    this._timestamp = timestamp
    this._intrusionObject = intrusionObject
  }

  get anomalyId(): number {
    return this._anomalyId
  }

  set anomalyId(anomalyId: number) {
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

  set timestamp(timestamp: Date) {
    this._timestamp = timestamp
  }

  get intrusionObject(): ObjectClass {
    return this._intrusionObject
  }

  set intrusionObject(intrusionObject: ObjectClass) {
    this._intrusionObject = intrusionObject
  }
}
