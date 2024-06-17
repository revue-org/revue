import { Device } from '@/domain/core/Device'
import { DeviceId } from '@/domain/core/DeviceId'

export interface DeviceRepository {
  getDeviceById(deviceId: DeviceId): Promise<Device>

  getDevices(): Promise<Device[]>

  getDevice(deviceId: DeviceId): Promise<Device>

  saveDevice(device: Device): Promise<void>

  updateDevice(device: Device): Promise<void>

  removeDevice(deviceId: DeviceId): Promise<void>
}
