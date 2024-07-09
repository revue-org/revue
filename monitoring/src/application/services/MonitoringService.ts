import { Measurement } from 'common/dist/domain/core'

export interface MonitoringService {
  sendMeasurementToUser(measurement: Measurement): void
}
