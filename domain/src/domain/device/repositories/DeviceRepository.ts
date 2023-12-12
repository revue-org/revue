import { Device } from '../core/Device'
import { DeviceId } from '../core/DeviceId'
import { SensorImpl } from "../core/impl/SensorImpl";
import { CameraImpl } from "../core/impl/CameraImpl";
import { Sensor } from "../core/Sensor";
import { Camera } from "../core/Camera";

export interface DeviceRepository {
  getDevice(deviceId: DeviceId): Promise<Camera | Sensor>

  insertDevice(device: Device): void

  deleteDevice(deviceId: DeviceId): void
}
