import {RecognizingNode} from "../../../domain/alarm-system/core/RecognizingNode";


export interface AnomalyRepository {
    getAnomalies(): Set<RecognizingNode>;

    insertAnomaly(anomaly: RecognizingNode): void;

    deleteAnomaly(anomalyId: number): void;
}
