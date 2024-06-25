import { Measurement } from '@common/domain/core/Measurement'
import { DeviceEvent } from 'common/dist/domain/core'

export interface MonitoringEventsHub {
  subscribeToMeasurements(handler: (measurement: Measurement) => void): void

  addMeasurementTopics(topics: string[]): void

  subscribeToDevices(handler: (device: DeviceEvent) => void): void
}
