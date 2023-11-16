import {Anomaly} from "domain/core/Anomaly";

interface MonitoringRoom {
    registerDevice(device: string): void;

    enableDevice(deviceId: number): void;

    disableDevice(deviceId: number): void;

    createSecurityRule(): void;

    deleteSecurityRule(): void;

    getHistory(deviceId: number): Anomaly[];
}
