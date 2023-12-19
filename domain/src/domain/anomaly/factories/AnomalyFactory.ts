import { Intrusion } from '../core/Intrusion.js'
import { Exceeding } from '../core/Exceeding.js'
import { Measure } from '../../device/core/impl/enum/Measure'
import { DeviceId } from '../../device/core/DeviceId'
import { ObjectClass } from '../../security-rule/core/impl/ObjectClass'

export interface AnomalyFactory {
  createExceeding(
    anomalyId: string,
    deviceId: DeviceId,
    timestamp: Date,
    value: number,
    measure: Measure
  ): Exceeding

  createIntrusion(
    anomalyId: string,
    deviceId: DeviceId,
    timestamp: Date,
    intrusionObject: ObjectClass
  ): Intrusion
}
