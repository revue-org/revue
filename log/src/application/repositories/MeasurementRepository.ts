import { Measurement } from '@common/domain/core/Measurement.js'
import { DomainEventId } from 'common/dist/domain/core/DomainEventId'

export interface MeasurementRepository {
  getMeasurements(quantity: number): Promise<Measurement[]>

  getMeasurementsBySourceDeviceId(deviceId: string, quantity: number): Promise<Measurement[]>

  saveMeasurement(measurement: Measurement): Promise<void>

  removeMeasurement(measurementId: DomainEventId): Promise<void>
}
