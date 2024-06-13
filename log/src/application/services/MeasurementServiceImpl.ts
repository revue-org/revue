import { MeasurementService } from '@/application/services/MeasurementService'
import { MeasurementRepository } from '@/application/repositories/MeasurementRepository'
import { Measurement } from '@common/domain/core/Measurement.js'
import { DomainEventId } from '@common/domain/core/DomainEventId.js'

export class MeasurementServiceImpl implements MeasurementService {
  private repository: MeasurementRepository

  constructor(repository: MeasurementRepository) {
    this.repository = repository
  }

  async getMeasurements(): Promise<Measurement[]> {
    return this.repository.getMeasurements()
  }

  async getMeasurementsBySourceDeviceId(deviceId: string, quantity: number): Promise<Measurement[]> {
    return this.repository.getMeasurementsBySourceDeviceId(deviceId, quantity)
  }

  async createMeasurement(measurement: Measurement): Promise<void> {
    await this.repository.saveMeasurement(measurement)
  }

  async updateMeasurement(measurementId: Measurement): Promise<void> {
    await this.repository.updateMeasurement(measurementId)
  }

  async removeMeasurement(measurementId: DomainEventId): Promise<void> {
    await this.repository.removeMeasurement(measurementId)
  }
}
