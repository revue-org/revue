import { Measurement } from '@common/domain/core'
import { Server as HttpServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

export class SocketMonitoringEventsHub {
  private readonly _io: SocketIOServer

  constructor(server: HttpServer) {
    this._io = new SocketIOServer(server, {
      cors: {
        origin: '*'
      }
    })
  }

  public publishMeasurement(measurement: Measurement): void {
    this._io.emit('measurement', { measurement: measurement })
  }
}
