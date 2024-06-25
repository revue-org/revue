import { MeasurementService } from '@/application/services/MeasurementService'
import { MeasurementRepository } from '@/application/repositories/MeasurementRepository'
import { Measurement } from '@common/domain/core/Measurement.js'
import { DomainEventId } from '@common/domain/core/DomainEventId.js'
import { MeasurementFactory } from 'common/dist/domain/factories/MeasurementFactory.js'
import { DeviceEvent, Measure } from 'common/dist/domain/core'
import { LogEventsHub } from '@/application/services/LogEventsHub'

export class MeasurementServiceImpl implements MeasurementService {
  private readonly _repository: MeasurementRepository
  private readonly _events: LogEventsHub

  constructor(repository: MeasurementRepository, events: LogEventsHub) {
    this._repository = repository
    this._events = events
    this.configureEvents()
  }

  private configureEvents(): void {
    this._events.subscribeToMeasurements((measurement: Measurement): void => {
      this._repository.saveMeasurement(measurement)
    })

    this._events.subscribeToDevices((event: DeviceEvent): void => {
      if (event.type === 'addition') {
        this._events.addMeasurementTopics([`measurements.${event.sourceDeviceId}`])
      }
    })
  }

  async getMeasurements(limit: number): Promise<Measurement[]> {
    return this._repository.getMeasurements(limit)
  }

  async getMeasurementsBySourceDeviceId(deviceId: string, quantity: number): Promise<Measurement[]> {
    return this._repository.getMeasurementsBySourceDeviceId(deviceId, quantity)
  }

  async createNumericMeasurement(
    timestamp: Date,
    sourceDeviceId: string,
    measure: Measure,
    value: number
  ): Promise<void> {
    await this._repository.saveMeasurement(
      MeasurementFactory.createNumericMeasurement(timestamp, sourceDeviceId, measure, value)
    )
  }

  async removeNumericMeasurement(measurementId: DomainEventId): Promise<void> {
    await this._repository.removeMeasurement(measurementId)
  }
}
