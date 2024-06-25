import { Measurement } from '@common/domain/core'
import { Server as SocketIOServer } from 'socket.io'

export class SocketMonitoringEventsHub {
  private readonly io: SocketIOServer

  constructor(server: SocketIOServer) {
    this.io = server
  }

  public publishMeasurement(measurement: Measurement): void {
    this.io.emit('measurements', { measurement: measurement })
  }
}
