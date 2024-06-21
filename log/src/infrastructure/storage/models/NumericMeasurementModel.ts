import { MeasurementFactory } from '@common/domain/factories/MeasurementFactory.js'
import { Measurement } from '@common/domain/core/Measurement'
import { Measure } from 'common/dist/domain/core'

export interface NumericMeasurementDBEntity {
  id: string
  timestamp: Date
  sourceDeviceId: string
  measure: Measure
  value: number
}

export class NumericMeasurementDBAdapter {
  static asDomainEntity(measurement: NumericMeasurementDBEntity): Measurement {
    return MeasurementFactory.numericMeasurementFrom(
      MeasurementFactory.idOf(measurement.id),
      measurement.timestamp,
      measurement.sourceDeviceId,
      measurement.measure,
      measurement.value
    )
  }

  static asDBEntity(measurement: Measurement): NumericMeasurementDBEntity {
    return {
      id: measurement.id.value,
      timestamp: measurement.timestamp,
      sourceDeviceId: measurement.sourceDeviceId,
      measure: {
        type: measurement.measure.type,
        unit: measurement.measure.unit
      },
      value: measurement.value
    }
  }
}
