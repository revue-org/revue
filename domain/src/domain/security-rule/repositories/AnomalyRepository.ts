import {SecurityRule} from "../core/SecurityRule";

interface AnomalyRepository {
    getAnomalies(): Set<SecurityRule>;

    insertAnomaly(anomaly: SecurityRule): void;

    deleteAnomaly(anomalyId: number): void;
}
