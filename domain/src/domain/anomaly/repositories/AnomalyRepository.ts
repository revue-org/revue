import { Anomaly } from '../core/Anomaly.js'
import { Exceeding } from '../core/Exceeding.js'
import { Intrusion } from '../core/Intrusion.js'
import { AnomalyType } from "../core/impl/enum/AnomalyType";

export interface AnomalyRepository {
  getExceedings(): Promise<Exceeding[]>

  getIntrusions(): Promise<Intrusion[]>

  getAnomalyById(anomalyId: string): Promise<Exceeding | Intrusion>

  insertAnomaly(anomaly: Anomaly): Promise<void>

  updateAnomaly(anomaly: Anomaly): Promise<void>

  deleteAnomaly(anomalyId: string, type: AnomalyType): Promise<void>
}
