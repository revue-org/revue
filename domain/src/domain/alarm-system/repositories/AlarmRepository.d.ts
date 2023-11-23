import { RecognizingNode } from "../core/RecognizingNode";
export interface AlarmRepository {
    getAnomalies(): Set<RecognizingNode>;
    insertAnomaly(anomaly: RecognizingNode): void;
    deleteAnomaly(anomalyId: number): void;
}
