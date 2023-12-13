import { Anomaly } from '../core/Anomaly.js'
import { Exceeding } from '../core/Exceeding'
import { Intrusion } from '../core/Intrusion'

export interface AnomalyRepository {
  getExceedings(): Promise<Array<Exceeding>>

  getIntrusions(): Promise<Array<Intrusion>>

  getAnomaly(anomalyId: number): Promise<Exceeding | Intrusion>

  insertAnomaly(anomaly: Anomaly): Promise<void>

  updateAnomaly(anomaly: Anomaly): Promise<void>

  deleteAnomaly(anomalyId: number): Promise<void>
}
