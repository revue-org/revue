import { Measurement } from '@common/domain/core/Measurement.js'
import { DomainEventId } from '@common/domain/core/DomainEventId.js'
import { Measure } from 'common/dist/domain/core'

export interface MeasurementService {
  getMeasurements(limit: number): Promise<Measurement[]>

  getMeasurementsBySourceDeviceId(deviceId: string, limit: number): Promise<Measurement[]>

  createNumericMeasurement(
    timestamp: Date,
    sourceDeviceId: string,
    measure: Measure,
    value: number
  ): Promise<void>

  removeNumericMeasurement(measurementId: DomainEventId): Promise<void>
}
