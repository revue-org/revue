import { DeviceId } from '../../domain/device/core/DeviceId.js'
import { Device } from '../../domain/device/core/Device.js'

export interface DeviceService {
  getAllDevices(): Set<Device>

  getDevice(deviceId: DeviceId): Device

  addDevice(device: Device): void

  removeDevice(deviceId: DeviceId): void

  deployDevice(deviceId: DeviceId): void
}
