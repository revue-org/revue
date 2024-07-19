import { MeasurementService } from '@/application/services/MeasurementService'
import { MeasurementRepository } from '@/application/repositories/MeasurementRepository'
import { Measurement } from '@common/domain/core/Measurement.js'
import { DomainEventId } from '@common/domain/core/DomainEventId.js'
import { MeasurementFactory } from 'common/dist/domain/factories/MeasurementFactory.js'
import { DeviceEvent, Measure } from 'common/dist/domain/core'
import { LogEventsHub } from '@/application/services/LogEventsHub'

export class MeasurementServiceImpl implements MeasurementService {
  private readonly repository: MeasurementRepository
  private readonly events: LogEventsHub

  constructor(repository: MeasurementRepository, events: LogEventsHub) {
    this.repository = repository
    this.events = events
    if (process.env.NODE_ENV !== 'test') {
      this.configureEvents()
    }
  }

  private configureEvents(): void {
    this.events.subscribeToMeasurements((measurement: Measurement): void => {
      this.repository.saveMeasurement(measurement)
    })

    this.events.subscribeToDevices((event: DeviceEvent): void => {
      if (event.type === 'addition') {
        this.events.addMeasurementTopics([`measurements.${event.sourceDeviceId}`])
      } else if (event.type === 'removal') {
        this.events.removeMeasurementTopics([`measurements.${event.sourceDeviceId}`])
      }
    })
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
      MeasurementFactory.createNumericMeasurement(timestamp, sourceDeviceId, measure, value)
    )
  }

  async removeNumericMeasurement(measurementId: DomainEventId): Promise<void> {
    await this.repository.removeMeasurement(measurementId)
  }
}
