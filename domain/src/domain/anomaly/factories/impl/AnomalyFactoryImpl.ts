import { AnomalyFactory } from '../AnomalyFactory.js'
import { ObjectClass } from '../../../security-rule/core/impl/enum/ObjectClass.js'
import { Exceeding } from '../../core/Exceeding.js'
import { DeviceId } from '../../../device/core/DeviceId.js'
import { Measure } from '../../../device/core/impl/enum/Measure.js'
import { Intrusion } from '../../core/Intrusion.js'
import { ExceedingImpl } from '../../core/impl/ExceedingImpl.js'
import { IntrusionImpl } from '../../core/impl/IntrusionImpl.js'

export class AnomalyFactoryImpl implements AnomalyFactory {
  createExceeding(
    anomalyId: string = '',
    deviceId: DeviceId,
    timestamp: Date,
    value: number,
    measure: Measure
  ): Exceeding {
    return new ExceedingImpl(anomalyId, deviceId, timestamp, value, measure)
  }

  createIntrusion(
    anomalyId: string = '',
    deviceId: DeviceId,
    timestamp: Date,
    intrusionObject: ObjectClass
  ): Intrusion {
    return new IntrusionImpl(anomalyId, deviceId, timestamp, intrusionObject)
  }
}
