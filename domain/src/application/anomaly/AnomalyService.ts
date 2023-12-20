import { Anomaly } from '../../domain/anomaly/core/Anomaly.js'

export interface AnomalyService {
  addAnomaly(anomaly: Anomaly): void

  removeAnomaly(anomalyId: string): void

  notifyAlarmService(anomaly: Anomaly): void
}
