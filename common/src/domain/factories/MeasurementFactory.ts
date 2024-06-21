import { NumericMeasurement, DomainEventId, Measure } from '../core'

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
