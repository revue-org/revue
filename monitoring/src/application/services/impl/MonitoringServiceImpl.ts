import { DeviceEvent, Measurement } from 'common/dist/domain/core'
import { MonitoringEventsHub } from '@/application/services/MonitoringEventsHub'
import { MonitoringService } from '@/application/services/MonitoringService'

export class MonitoringServiceImpl implements MonitoringService {
  private readonly _events: MonitoringEventsHub

  constructor(eventsHub: MonitoringEventsHub) {
    this._events = eventsHub
    this.configureEvents()
  }

  private configureEvents(): void {
    this._events.subscribeToMeasurements((measurement: Measurement): void => {
      //TODO: to check how to handle the measurement in the frontend
      this.sendMeasurementToUser(measurement)
    })

    this._events.subscribeToDevices((event: DeviceEvent): void => {
      if (event.type === 'addition') {
        this._events.addMeasurementTopics([`measurements.${event.sourceDeviceId}`])
      }
    })
  }

  public sendMeasurementToUser(measurement: Measurement): void {
    this._events.publishMeasurement(measurement)
  }
}
