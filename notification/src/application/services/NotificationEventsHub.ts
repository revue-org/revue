import { Anomaly } from "@common/domain/core";

export interface NotificationEventsHub {
    subscribeToAnomalies(handler: (anomaly: Anomaly) => void): void
}