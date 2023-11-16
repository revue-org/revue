import {Device} from "../core/Device";
import {DeviceId} from "../core/DeviceId";

interface DeviceRepository {
    getAllDevices(): Set<Device>;

    getDevice(deviceId: DeviceId): Device;

    insertDevice(device: Device): void;

    deleteDevice(deviceId: DeviceId): void;
}
