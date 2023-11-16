import {Anomaly} from "../domain/core/Anomaly";

interface AnomalyService {
    addAnomaly(anomaly: Anomaly): void;

    removeAnomaly(anomalyId: string): void;

    notifyAlarmService(anomaly: Anomaly): void;
}
