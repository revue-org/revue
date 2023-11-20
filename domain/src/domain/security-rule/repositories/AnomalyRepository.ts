import {SecurityRule} from "../core/SecurityRule";

export interface AnomalyRepository {
    getAnomalies(): Set<SecurityRule>;

    insertAnomaly(anomaly: SecurityRule): void;

    deleteAnomaly(anomalyId: number): void;
}
