import { Anomaly } from "../../anomaly/core/Anomaly";
export interface Notification {
    getNotificationId(): number;
    getTimestamp(): Date;
    getAnomaly(): Anomaly;
}
