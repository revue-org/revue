import {Anomaly} from "../core/Anomaly";

interface AnomalyRepository {
    getAnomalies(): Set<Anomaly>;

    insertAnomaly(anomaly: Anomaly): void;

    deleteAnomaly(anomalyId: number): void;
}
