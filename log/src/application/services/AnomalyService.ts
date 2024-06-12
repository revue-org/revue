import { Anomaly } from "@common/domain/core/Anomaly.js";
import { Outlier } from "@common/domain/core/Outlier.js";
import { Intrusion } from "@common/domain/core/Intrusion.js";
import { DomainEventId } from "@common/domain/core/DomainEventId.js";

export interface AnomalyService {
  getAnomalies(): Promise<Anomaly[]>;

  getOutliers(): Promise<Outlier[]>;

  getIntrusions(): Promise<Intrusion[]>;

  getAnomalyById(anomalyId: DomainEventId): Promise<Anomaly>;

  createOutlier(outlier: Outlier): void;

  createIntrusion(intrusion: Intrusion): void;

  updateOutlier(outlier: Outlier): void;

  updateIntrusion(intrusion: Intrusion): void;

  deleteAnomaly(anomalyId: DomainEventId): void;

}
