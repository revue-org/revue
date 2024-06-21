import { Device } from '@/domain/core/Device.js'
import { DeviceId } from '@/domain/core/DeviceId.js'
import { CapabilityType } from '@/domain/core/capabilities/CapabilityType.js'

export interface DeviceRepository {
  getDeviceById(deviceId: DeviceId): Promise<Device>

  getDevices(): Promise<Device[]>

  getActiveDevices(): Promise<Device[]>

  getDevice(deviceId: DeviceId): Promise<Device>

  saveDevice(device: Device): Promise<void>

  updateDevice(device: Device): Promise<void>

  removeDevice(deviceId: DeviceId): Promise<void>
}
