import { MonitoringEventsHub } from '@/application/services/MonitoringEventsHub'
import { DeviceEvent, Measurement } from '@common/domain/core'
import { SocketMonitoringEventsHub } from '@/infrastructure/events/socket/SocketMonitoringEventsHub.js'
import { KafkaMonitoringEventsHub } from '@/infrastructure/events/kafka/KafkaMonitoringEventsHub.js'

export class MonitoringEventsHubImpl implements MonitoringEventsHub {
  private readonly kafkaEvents: KafkaMonitoringEventsHub
  private readonly socketEvents: SocketMonitoringEventsHub

  constructor(kafkaMonitoring: KafkaMonitoringEventsHub, socketMonitoring: SocketMonitoringEventsHub) {
    this.kafkaEvents = kafkaMonitoring
    this.socketEvents = socketMonitoring
  }

  async subscribeToMeasurements(handler: (_measurement: Measurement) => void): Promise<void> {
    this.kafkaEvents.subscribeToMeasurements(handler)
  }

  addMeasurementTopics(topics: string[]): void {
    this.kafkaEvents.addMeasurementTopics(topics)
  }

  removeMeasurementTopics(topics: string[]): void {
    this.kafkaEvents.removeMeasurementTopics(topics)
  }

  async subscribeToDevices(handler: (event: DeviceEvent) => void): Promise<void> {
    this.kafkaEvents.subscribeToDevices(handler)
  }

  publishMeasurement(measurement: Measurement): void {
    this.socketEvents.publishMeasurement(measurement)
  }
}
