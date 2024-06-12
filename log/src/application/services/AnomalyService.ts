import { Anomaly } from "@/domain/core/Anomaly";
import { Outlier } from "@/domain/core/Outlier";
import { Intrusion } from "@/domain/core/Intrusion";
import { AnomalyId } from "@/domain/core/AnomalyId";

export interface AnomalyService {
  getAnomalies(): Promise<Anomaly[]>;

  getOutliers(): Promise<Outlier[]>;

  getIntrusions(): Promise<Intrusion[]>;

  getAnomalyById(anomalyId: AnomalyId): Promise<Anomaly>;

  createOutlier(outlier: Outlier): void;

  createIntrusion(intrusion: Intrusion): void;

  updateOutlier(outlier: Outlier): void;

  updateIntrusion(intrusion: Intrusion): void;

  deleteAnomaly(anomalyId: AnomalyId): void;

}
