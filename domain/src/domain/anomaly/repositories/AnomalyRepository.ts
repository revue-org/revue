import { Anomaly } from '../core/Anomaly'

export interface AnomalyRepository {
  getAnomalies(): Set<Anomaly>

  insertAnomaly(anomaly: Anomaly): void

  deleteAnomaly(anomalyId: number): void
}
