import { Intrusion } from '../core/Intrusion.js'
import { Exceeding } from '../core/Exceeding.js'
import { Measure } from '../../device/core/impl/enum/Measure.js'
import { DeviceId } from '../../device/core/DeviceId.js'
import { ObjectClass } from '../../security-rule/core/impl/enum/ObjectClass.js'

export interface AnomalyFactory {
  createExceeding(
    anomalyId: string,
    deviceId: DeviceId,
    timestamp: Date,
    measure: Measure,
    value: number
  ): Exceeding

  createIntrusion(
    anomalyId: string,
    deviceId: DeviceId,
    timestamp: Date,
    intrusionObject: ObjectClass
  ): Intrusion
}
