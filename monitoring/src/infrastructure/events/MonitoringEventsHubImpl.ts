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

  async listenToMeasurements(handler: (_measurement: Measurement) => void): Promise<void> {
    this.kafkaEvents.subscribeToMeasurements(handler)
  }

  registerDevices(deviceIds: string[]): void {
    this.kafkaEvents.addMeasurementTopics(deviceIds.map(id => `measurements.${id}`))
  }

  unregisterDevices(deviceIds: string[]): void {
    this.kafkaEvents.removeMeasurementTopics(deviceIds.map(id => `measurements.${id}`))
  }

  async listenToDeviceEvents(handler: (event: DeviceEvent) => void): Promise<void> {
    this.kafkaEvents.subscribeToDevices(handler)
  }

  publishMeasurement(measurement: Measurement): void {
    this.socketEvents.publishMeasurement(measurement)
  }
}
