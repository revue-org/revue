import { Anomaly } from '@common/domain/core/Anomaly'
import { Measurement } from '@common/domain/core/Measurement'
import { Detection } from '@common/domain/core/Detection'
import { DeviceEvent } from 'common/dist/domain/core'

export interface AlarmEventsHub {
  publishAnomaly(anomaly: Anomaly): void

  subscribeToMeasurements(handler: (measurement: Measurement) => void): void

  subscribeToDetections(handler: (detection: Detection) => void): void

  addMeasurementTopics(topics: string[]): void

  removeMeasurementTopics(topics: string[]): void

  subscribeToDevices(handler: (deviceEvent: DeviceEvent) => void): void
}
