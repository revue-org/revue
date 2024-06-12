import { Measurement } from '@common/domain/core/Measurement.js'
import { DomainEventId } from '@common/domain/core/DomainEventId.js'
export interface MeasurementService {
  getMeasurements(): Promise<Measurement[]>

  getMeasurementsBySourceDeviceId(deviceId: string, quantity: number): Promise<Measurement[]>

  createMeasurement(measurement: Measurement): void

  updateMeasurement(measurementId: Measurement): void

  removeMeasurement(measurementId: DomainEventId): void
}
