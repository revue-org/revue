import { Intrusion } from '../core/Intrusion.js'
import { Exceeding } from '../core/Exceeding.js'
import { Measure } from '../../device/core/impl/enum/Measure.js'
import { DeviceId } from '../../device/core/DeviceId.js'
import { ObjectClass } from '../../security-rule/core/impl/enum/ObjectClass.js'

export interface AnomalyFactory {
  createExceeding(
    deviceId: DeviceId,
    timestamp: Date,
    measure: Measure,
    value: number,
    anomalyId: string
  ): Exceeding

  createIntrusion(
    deviceId: DeviceId,
    timestamp: Date,
    intrusionObject: ObjectClass,
    anomalyId: string
  ): Intrusion
}
