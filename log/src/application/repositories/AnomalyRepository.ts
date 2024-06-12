import { Anomaly } from '@common/domain/core/Anomaly.js'
import { Intrusion } from '@common/domain/core/Intrusion.js'
import { Outlier } from "@common/domain/core/Outlier.js";
import { DomainEventId } from "@common/domain/core/DomainEventId.js";

export interface AnomalyRepository {

  getAnomalies(): Promise<Anomaly[]>

  getOutliers(): Promise<Outlier[]>

  getIntrusions(): Promise<Intrusion[]>

  getAnomalyById(anomalyId: DomainEventId): Promise<Anomaly>

  saveAnomaly(anomaly: Anomaly): Promise<void>

  updateAnomaly(anomaly: Anomaly): Promise<void>

  removeAnomaly(anomalyId: DomainEventId): Promise<void>

}
