import { Device } from '../core/Device.js'
import { DeviceId } from '../core/DeviceId.js'
import { Sensor } from "../core/Sensor.js";
import { Camera } from "../core/Camera.js";

export interface DeviceRepository {
  getDevice(deviceId: DeviceId): Promise<Camera | Sensor>

  insertDevice(device: Device): void

  deleteDevice(deviceId: DeviceId): void
}
