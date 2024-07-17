import { NumericMeasurement, DomainEventId, Measure } from '../core'
import { v4 as uuidv4 } from 'uuid'

export class MeasurementFactory {
  static newId(): DomainEventId {
    return { value: uuidv4() }
  }

  static idOf(value: string): DomainEventId {
    return {
      value
    }
  }

  static createNumericMeasurement(
    timestamp: Date,
    sourceDeviceId: string,
    measure: Measure,
    value: number
  ): NumericMeasurement {
    return this.numericMeasurementFrom(this.newId(), timestamp, sourceDeviceId, measure, value)
  }

  static numericMeasurementFrom(
    id: DomainEventId,
    timestamp: Date,
    sourceDeviceId: string,
    measure: Measure,
    value: number
  ): NumericMeasurement {
    return {
      id,
      timestamp,
      type: 'measurement',
      sourceDeviceId,
      measure: measure,
      value
    }
  }
}
