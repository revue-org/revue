import { Measurement } from 'common/dist/domain/core'
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
      console.log('TO DELETE:')
      console.log(measurement)
      //TODO: to check how to handle the measurement in the frontend
      this.io.emit('measurement', { measurement: measurement })
    })
  }

  sendMeasurementToUser(measurement: Measurement): void {
    this.events.subscribeToMeasurements(m => {
      if (m === measurement) {
        console.log('Measurement sent to user:', measurement)
      }
    })
  }
}
