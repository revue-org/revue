import {Anomaly} from "./anomaly/Anomaly";

interface MonitoringRoom {
    registerDevice(device: string): void;
    enableDevice(deviceId: number): void;
    disableDevice(deviceId: number): void;
    createSecurityRule(): void;
    deleteSecurityRule(): void;
    getHistory(deviceId: number): Anomaly[];
}
class AnomalyImpl implements Anomaly {
    anomalyId: number;
    timestamp: string;

    constructor(anomalyId: number, timestamp: string) {
        this.anomalyId = anomalyId;
        this.timestamp = timestamp;
    }
}

let anomaly: Anomaly = new AnomalyImpl(1, "2020-01-01T00:00:00.000Z")

const test = new MonitoringRoom();
