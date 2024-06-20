import { Measurement } from '../../../domain/core'
import { measurementSchema } from '../schemas/MeasurementSchema'

export class MeasurementsAdapter {
  static asDomainEvent(measurementObj: object): Measurement {
    return measurementSchema.parse(measurementObj)
  }

  static asMessage(measurement: Measurement): object {
    return { ...measurement }
  }
}
