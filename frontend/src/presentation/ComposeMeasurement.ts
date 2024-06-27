import { type Measurement } from 'common/dist/domain/core'
import { MeasureFactory, MeasurementFactory } from 'common/dist/domain/factories'

export const composeMeasurement = (measurement: any): Measurement => {
  return MeasurementFactory.numericMeasurementFrom(
    MeasurementFactory.idOf(measurement.id),
    new Date(measurement.timestamp),
    measurement.sourceDeviceId,
    MeasureFactory.createMeasure(measurement.measure.type, measurement.measure.unit),
    measurement.value
  )
}