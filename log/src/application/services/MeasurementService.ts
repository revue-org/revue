import { Measurement } from '@common/domain/core/Measurement.js'
import { DomainEventId } from '@common/domain/core/DomainEventId.js'
import { MeasureType } from 'common/dist/domain/core/MeasureType'

export interface MeasurementService {
  getMeasurements(): Promise<Measurement[]>

  getMeasurementsBySourceDeviceId(deviceId: string, quantity: number): Promise<Measurement[]>

  createNumericMeasurement(
    timestamp: Date,
    sourceDeviceId: string,
    measureType: MeasureType,
    value: number
  ): Promise<void>

  removeNumericMeasurement(measurementId: DomainEventId): Promise<void>
}
