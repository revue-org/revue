import { Anomaly } from '../../domain/alarm-system/core/Anomaly.js'
import { Exceeding } from '../../domain/alarm-system/core/Exceeding.js'
import { Intrusion } from '../../domain/alarm-system/core/Intrusion.js'
import { AnomalyType } from '../../domain/alarm-system/core/impl/enum/AnomalyType.js'

export interface AnomalyService {
  getExceedings(): Promise<Exceeding[]>

  getIntrusions(): Promise<Intrusion[]>

  getAnomalyById(anomalyId: string): Promise<Anomaly>

  insertExceeding(exceeding: Exceeding): Promise<string>

  insertIntrusion(intrusion: Intrusion): Promise<string>

  updateExceeding(exceeding: Exceeding): void

  updateIntrusion(intrusion: Intrusion): void

  deleteAnomaly(anomalyId: string, type: AnomalyType): void

  notifyNotificationService(anomaly: Anomaly): void
}
