import { Measurement } from '@common/domain/core/Measurement'

export interface LogEventsHub {
  subscribeToMeasurements(handler: (measurement: Measurement) => void): void
}
