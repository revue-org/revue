import { Device } from '../core/Device'
import { DeviceId } from '../core/DeviceId'
import { SensorImpl } from "../core/impl/SensorImpl";
import { CameraImpl } from "../core/impl/CameraImpl";

export interface DeviceRepository {
  getDevice(deviceId: DeviceId): Promise<CameraImpl | SensorImpl>

  insertDevice(device: Device): void

  deleteDevice(deviceId: DeviceId): void
}
