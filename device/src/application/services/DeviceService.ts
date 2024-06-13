import { DeviceCapability } from '../../domain/core/capabilities/DeviceCapability'
import { Device } from '../../domain/core/Device'
import { DeviceEndpoint } from '../../domain/core/DeviceEndpoint'
import { DeviceId } from '../../domain/core/DeviceId'

export interface DeviceService {
  getDeviceCapabilities(deviceId: DeviceId): Promise<DeviceCapability[]>

  getDeviceLocation(deviceId: DeviceId): Promise<string>

  getDevice(deviceId: DeviceId): Promise<Device>

  getDevices(): Promise<Device[]>

  createDevice(
    description: string,
    endpoint: DeviceEndpoint,
    locationId: string,
    enabled: boolean,
    capabilities: DeviceCapability[]
  ): Promise<void>

  updateDevice(
    deviceId: DeviceId,
    description: string,
    endpoint: DeviceEndpoint,
    locationId: string,
    enabled: boolean,
    capabilities: DeviceCapability[]
  ): Promise<void>

  deleteDevice(deviceId: DeviceId): Promise<void>

  enableDevice(deviceId: DeviceId): Promise<void>

  disableDevice(deviceId: DeviceId): Promise<void>
}
