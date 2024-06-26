import { Measurement } from '@common/domain/core'
import { Server as SocketIOServer } from 'socket.io'

export class SocketMonitoringEventsHub {
  private readonly io: SocketIOServer

  constructor(server: SocketIOServer) {
    this.io = server
  }

  public publishMeasurement(measurement: Measurement): void {
    const topic: string = `measurements.${measurement.sourceDeviceId}`
    console.log(`Publishing measurement to topic: ${topic}`)
    this.io.emit(topic, { measurement: measurement })
  }
}
