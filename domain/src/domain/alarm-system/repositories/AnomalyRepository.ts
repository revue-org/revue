import {RecognizingNode} from "../core/RecognizingNode";

interface AnomalyRepository {
    getAnomalies(): Set<RecognizingNode>;

    insertAnomaly(anomaly: RecognizingNode): void;

    deleteAnomaly(anomalyId: number): void;
}
