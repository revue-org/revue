import { AnomalyFactory } from '../AnomalyFactory'
import { ObjectClass } from '../../../security-rule/core/impl/ObjectClass'
import { Exceeding } from '../../core/Exceeding'
import { DeviceId } from '../../../device/core/DeviceId'
import { Measure } from '../../../device/core/impl/enum/Measure'
import { Intrusion } from '../../core/Intrusion'
import { ExceedingImpl } from '../../core/impl/ExceedingImpl'
import { IntrusionImpl } from '../../core/impl/IntrusionImpl'

export class AnomalyFactoryImpl implements AnomalyFactory {
  createExceeding(
    anomalyId: string,
    deviceId: DeviceId,
    timestamp: Date,
    value: number,
    measure: Measure
  ): Exceeding {
    return new ExceedingImpl(anomalyId, deviceId, timestamp, value, measure)
  }

  createIntrusion(
    anomalyId: string,
    deviceId: DeviceId,
    timestamp: Date,
    intrusionObject: ObjectClass
  ): Intrusion {
    return new IntrusionImpl(anomalyId, deviceId, timestamp, intrusionObject)
  }
}
