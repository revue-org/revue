import { Anomaly } from '@/domain/core/Anomaly.js'
import { Intrusion } from '@/domain/core/Intrusion.js'
import { AnomalyId } from "@/domain/core/AnomalyId";
import { Outlier } from "@/domain/core/Outlier";

export interface AnomalyRepository {

  getAnomalies(): Promise<Anomaly[]>

  getOutliers(): Promise<Outlier[]>

  getIntrusions(): Promise<Intrusion[]>

  getAnomalyById(anomalyId: AnomalyId): Promise<Anomaly>

  saveAnomaly(anomaly: Anomaly): Promise<void>

  updateAnomaly(anomaly: Anomaly): Promise<void>

  removeAnomaly(anomalyId: AnomalyId): Promise<void>

}
