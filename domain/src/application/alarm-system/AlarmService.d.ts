import { Anomaly } from "../../domain/anomaly/core/Anomaly";
import { DeviceId } from "../../domain/device/core/DeviceId";
export interface AlarmService {
    startRecognizing(deviceId: DeviceId): void;
    stopRecognizing(deviceId: DeviceId): void;
    sendNotification(anomaly: Anomaly): void;
}
