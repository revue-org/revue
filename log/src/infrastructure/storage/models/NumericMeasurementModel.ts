import { MeasurementFactory } from '@common/domain/factories/MeasurementFactory.js'
import { MeasureType } from '@common/domain/core/MeasureType'
import { Measurement } from '@common/domain/core/Measurement'

export interface NumericMeasurementDBEntity {
  id: string
  timestamp: Date
  sourceDeviceId: string
  measureType: MeasureType
  value: number
}

export class NumericMeasurementDBAdapter {
  static asDomainEntity(measurement: NumericMeasurementDBEntity): Measurement {
    return MeasurementFactory.createNumericMeasurement(
      MeasurementFactory.idOf(measurement.id),
      measurement.timestamp,
      measurement.sourceDeviceId,
      measurement.measureType,
      measurement.value
    )
  }

  static asDBEntity(measurement: Measurement): NumericMeasurementDBEntity {
    return {
      id: measurement.id.value,
      timestamp: measurement.timestamp,
      sourceDeviceId: measurement.sourceDeviceId,
      measureType: measurement.measureType,
      value: measurement.value
    }
  }
}
