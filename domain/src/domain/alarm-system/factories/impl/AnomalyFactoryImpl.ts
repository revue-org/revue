import { AnomalyFactory } from '../AnomalyFactory.js'
import { ObjectClass } from '../../../alarm-system/core/impl/enum/ObjectClass.js'
import { Exceeding } from '../../core/Exceeding.js'
import { DeviceId } from '../../../device/core/DeviceId.js'
import { Measure } from '../../../device/core/impl/enum/Measure.js'
import { Intrusion } from '../../core/Intrusion.js'
import { ExceedingImpl } from '../../core/impl/ExceedingImpl.js'
import { IntrusionImpl } from '../../core/impl/IntrusionImpl.js'

export class AnomalyFactoryImpl implements AnomalyFactory {
  createExceeding(
    deviceId: DeviceId,
    timestamp: Date,
    measure: Measure,
    value: number,
    anomalyId: string
  ): Exceeding {
    return new ExceedingImpl(anomalyId, deviceId, timestamp, measure, value)
  }

  createIntrusion(
    deviceId: DeviceId,
    timestamp: Date,
    intrusionObject: ObjectClass,
    anomalyId: string
  ): Intrusion {
    return new IntrusionImpl(anomalyId, deviceId, timestamp, intrusionObject)
  }
}
