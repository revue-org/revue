import { Measurement } from 'common/dist/domain/core'

export interface MonitoringService {
  notifyMeasurement(measurement: Measurement): void
}
