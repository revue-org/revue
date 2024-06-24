import { MeasurementService } from '@/application/services/MeasurementService'
import { MeasurementRepository } from '@/application/repositories/MeasurementRepository'
import { Measurement } from '@common/domain/core/Measurement.js'
import { DomainEventId } from '@common/domain/core/DomainEventId.js'
import { MeasurementFactory } from 'common/dist/domain/factories/MeasurementFactory'
import { DeviceEvent, Measure } from 'common/dist/domain/core'
import { LogEventsHub } from '@/application/services/LogEventsHub'

export class MeasurementServiceImpl implements MeasurementService {
  private repository: MeasurementRepository
  private events: LogEventsHub

  constructor(repository: MeasurementRepository, events: LogEventsHub) {
    this.repository = repository
    this.events = events
    // this.configureEvents()
  }

  private configureEvents(): void {
    this.events.subscribeToMeasurements((measurement: Measurement): void => {
      this.repository.saveMeasurement(measurement)
    })

    this.events.subscribeToDevices((event: DeviceEvent): void => {
      if (event.type === 'addition') {
        // if the device event is an addition, resubscribe to the measurements to save measurements of the new device.
        // the subscribe method will be called again, and new topics will be added to the consumer
        this.events.subscribeToMeasurements((measurement: Measurement): void => {
          this.repository.saveMeasurement(measurement)
        })
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
