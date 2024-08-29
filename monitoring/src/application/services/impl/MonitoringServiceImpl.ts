import { DeviceEvent, Measurement } from 'common/dist/domain/core'
import { MonitoringEventsHub } from '@/application/services/MonitoringEventsHub'
import { MonitoringService } from '@/application/services/MonitoringService'

export class MonitoringServiceImpl implements MonitoringService {
  private readonly events: MonitoringEventsHub

  constructor(eventsHub: MonitoringEventsHub) {
    this.events = eventsHub
    this.configureEvents()
  }

  private configureEvents(): void {
    this.events.listenToMeasurements((measurement: Measurement): void => {
      this.notifyMeasurement(measurement)
    })

    this.events.listenToDeviceEvents((event: DeviceEvent): void => {
      if (event.type === 'addition') {
        this.events.registerDevices([event.sourceDeviceId])
      } else if (event.type === 'removal') {
        this.events.unregisterDevices([event.sourceDeviceId])
      }
    })
  }

  public notifyMeasurement(measurement: Measurement): void {
    this.events.publishMeasurement(measurement)
  }
}
