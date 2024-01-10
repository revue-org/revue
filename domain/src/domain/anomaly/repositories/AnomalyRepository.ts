import { Anomaly } from '../core/Anomaly.js'
import { Exceeding } from '../core/Exceeding'
import { Intrusion } from '../core/Intrusion'

export interface AnomalyRepository {
  getExceedings(): Promise<Exceeding[]>

  getIntrusions(): Promise<Intrusion[]>

  getAnomalyById(anomalyId: string): Promise<Exceeding | Intrusion>

  insertAnomaly(anomaly: Anomaly): Promise<void>

  updateAnomaly(anomaly: Anomaly): Promise<void>

  deleteAnomaly(anomalyId: string): Promise<void>
}
