import { Measurement } from '@common/domain/core/Measurement'
import { Anomaly, DeviceEvent } from 'common/dist/domain/core'

export interface LogEventsHub {
  subscribeToMeasurements(handler: (measurement: Measurement) => void): void

  addMeasurementTopics(topics: string[]): void

  subscribeToAnomalies(handler: (anomaly: Anomaly) => void): void

  subscribeToDevices(handler: (device: DeviceEvent) => void): void
}
