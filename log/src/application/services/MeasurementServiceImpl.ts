import { MeasurementService } from '@/application/services/MeasurementService'
import { MeasurementRepository } from '@/application/repositories/MeasurementRepository'
import { Measurement } from '@common/domain/core/Measurement.js'
import { DomainEventId } from '@common/domain/core/DomainEventId.js'
import { MeasurementFactory } from 'common/dist/domain/factories/MeasurementFactory'
import { Measure } from 'common/dist/domain/core'

export class MeasurementServiceImpl implements MeasurementService {
  private repository: MeasurementRepository

  constructor(repository: MeasurementRepository) {
    this.repository = repository
  }

  async getMeasurements(limit: number): Promise<Measurement[]> {
    return this.repository.getMeasurements(limit)
  }

  async getMeasurementsBySourceDeviceId(deviceId: string, quantity: number): Promise<Measurement[]> {
    return this.repository.getMeasurementsBySourceDeviceId(deviceId, quantity)
  }

  async createNumericMeasurement(
    timestamp: Date,
    sourceDeviceId: string,
    measure: Measure,
    value: number
  ): Promise<void> {
    await this.repository.saveMeasurement(
      MeasurementFactory.createNumericMeasurement(
        MeasurementFactory.newId(),
        timestamp,
        sourceDeviceId,
        measure,
        value
      )
    )
  }

  async removeNumericMeasurement(measurementId: DomainEventId): Promise<void> {
    await this.repository.removeMeasurement(measurementId)
  }
}
