import { NumericMeasurement } from '../core/NumericMeasurment'
import { DomainEventId } from '../core/DomainEventId'
import { Measure } from '../core/Measure'

export class MeasurementFactory {
  static newId(): DomainEventId {
    return {
      value: 'test'
    }
  }

  static idOf(value: string): DomainEventId {
    return {
      value
    }
  }

  static createNumericMeasurement(
    id: DomainEventId,
    timestamp: Date,
    sourceDeviceId: string,
    measure: Measure,
    value: number
  ): NumericMeasurement {
    return {
      id,
      timestamp,
      sourceDeviceId,
      measure: measure,
      value
    }
  }
}
