import { Measurement } from '@common/domain/core/Measurement'

export interface EventsHub {
  subscribeToMeasurements(handler: (measurement: Measurement) => void): void
}
