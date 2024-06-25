import { DeviceEvent, Measurement } from 'common/dist/domain/core'
import { MonitoringEventsHub } from '@/application/services/MonitoringEventsHub'
import { MonitoringService } from '@/application/services/MonitoringService'
import { Server as SocketIOServer } from 'socket.io'

export class MonitoringServiceImpl implements MonitoringService {
  private readonly events: MonitoringEventsHub
  private readonly io: SocketIOServer

  constructor(server: any, eventsHub: MonitoringEventsHub) {
    this.events = eventsHub
    this.io = new SocketIOServer(server, {
      cors: {
        origin: '*'
      }
    })
    // this.configureEvents()
  }

  private configureEvents(): void {
    this.events.subscribeToMeasurements((measurement: Measurement): void => {
      //TODO: to check how to handle the measurement in the frontend
      this.sendMeasurementToUser(measurement)
    })

    this.events.subscribeToDevices((event: DeviceEvent): void => {
      if (event.type === 'addition') {
        this.events.addMeasurementTopics([`measurements.${event.sourceDeviceId}`])
      }
    })
  }

  public sendMeasurementToUser(measurement: Measurement): void {
    this.io.emit('measurement', { measurement: measurement })
  }
}
