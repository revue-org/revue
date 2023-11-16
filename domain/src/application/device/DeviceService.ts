import {DeviceId} from "../../domain/device/core/DeviceId";
import {Device} from "../../domain/device/core/Device";

export interface DeviceService {
    getAllDevices(): Set<Device>;

    getDevice(deviceId: DeviceId): Device;

    addDevice(device: Device): void;

    removeDevice(deviceId: DeviceId): void;

    deployDevice(deviceId: DeviceId): void;
}
