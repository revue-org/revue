import {Anomaly} from "../../anomaly/core/Anomaly";
import {DeviceId} from "../../device/core/DeviceId";

export interface RecognizingNode {
    getRecognizingNodeId(): string;

    getIpAddress(): string;

    getDeviceIds(): Set<DeviceId>;

    anomalyDetected(): Anomaly;
}
