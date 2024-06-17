import { Anomaly } from '@common/domain/core/Anomaly'
import { Measurement } from '@common/domain/core/Measurement'
import { Detection } from '@common/domain/core/Detection'

export interface EventsService {
  publishAnomaly(anomaly: Anomaly): void

  subscribeToMeasurements(handler: (measurement: Measurement) => void): void

  subscribeToDetections(handler: (detection: Detection) => void): void
}
