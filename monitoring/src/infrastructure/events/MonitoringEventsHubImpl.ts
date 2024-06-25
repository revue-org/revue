import { MonitoringEventsHub } from '@/application/services/MonitoringEventsHub'
import { DeviceEvent, Measurement } from '@common/domain/core'
import { SocketMonitoringEventsHub } from '@/infrastructure/events/socket/SocketMonitoringEventsHub.js'
import { KafkaMonitoringEventsHub } from '@/infrastructure/events/kafka/KafkaMonitoringEventsHub.js'

export class MonitoringEventsHubImpl implements MonitoringEventsHub {
  private readonly _kafkaEvents: KafkaMonitoringEventsHub
  private readonly _socketEvents: SocketMonitoringEventsHub

  constructor(kafkaMonitoring: KafkaMonitoringEventsHub, socketMonitoring: SocketMonitoringEventsHub) {
    this._kafkaEvents = kafkaMonitoring
    this._socketEvents = socketMonitoring
  }

  async subscribeToMeasurements(handler: (_measurement: Measurement) => void): Promise<void> {
    this._kafkaEvents.subscribeToMeasurements(handler)
  }

  addMeasurementTopics(topics: string[]): void {
    this._kafkaEvents.addMeasurementTopics(topics)
  }

  async subscribeToDevices(handler: (event: DeviceEvent) => void): Promise<void> {
    this._kafkaEvents.subscribeToDevices(handler)
  }

  publishMeasurement(measurement: Measurement): void {
    this._socketEvents.publishMeasurement(measurement)
  }
}
