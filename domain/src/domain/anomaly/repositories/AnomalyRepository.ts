import { Anomaly } from '../core/Anomaly.js'
import { Exceeding } from '../core/Exceeding.js'
import { Intrusion } from '../core/Intrusion.js'

export interface AnomalyRepository {
  getExceedings(): Promise<Exceeding[]>

  getIntrusions(): Promise<Intrusion[]>

  getAnomalyById(anomalyId: string): Promise<Exceeding | Intrusion>

  insertAnomaly(anomaly: Anomaly): Promise<void>

  updateAnomaly(anomaly: Anomaly): Promise<void>

  deleteAnomaly(anomalyId: string): Promise<void>
}
