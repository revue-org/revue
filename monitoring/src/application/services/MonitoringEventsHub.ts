import { Measurement } from '@common/domain/core/Measurement'

export interface MonitoringEventsHub {
  subscribeToMeasurements(handler: (measurement: Measurement) => void): void
}
