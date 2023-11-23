import { Anomaly } from "../../anomaly/core/Anomaly";
import { DeviceId } from "../../device/core/DeviceId";
import { Device } from "../../device/core/Device";
export interface MonitoringRoom {
    registerDevice(device: Device): void;
    enableDevice(deviceId: DeviceId): void;
    disableDevice(deviceId: DeviceId): void;
    createSecurityRule(): void;
    deleteSecurityRule(): void;
    getHistory(deviceId: DeviceId): Anomaly[];
}
