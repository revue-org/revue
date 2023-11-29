import { Anomaly } from '../../domain/anomaly/core/Anomaly';
export interface AnomalyService {
    addAnomaly(anomaly: Anomaly): void;
    removeAnomaly(anomalyId: string): void;
    notifyAlarmService(anomaly: Anomaly): void;
}
