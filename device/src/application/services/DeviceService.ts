import { DeviceCapability } from '@/domain/core/capabilities/DeviceCapability'
import { Device } from '@/domain/core/Device'
import { DeviceEndpoint } from '@/domain/core/DeviceEndpoint'
import { DeviceId } from '@/domain/core/DeviceId'
import { CapabilityType } from "@/domain/core/capabilities/CapabilityType";

export interface DeviceService {
  getDevices(capabilities: CapabilityType[]): Promise<Device[]>

  getActiveDevices(): Promise<Device[]>

  getDeviceById(deviceId: DeviceId): Promise<Device>

  createDevice(
    description: string,
    endpoint: DeviceEndpoint,
    locationId: string,
    enabled: boolean,
    capabilities: DeviceCapability[]
  ): Promise<DeviceId>

  updateDevice(
    deviceId: DeviceId,
    description: string,
    endpoint: DeviceEndpoint,
    locationId: string,
    enabled: boolean,
    capabilities: DeviceCapability[]
  ): Promise<void>

  deleteDevice(deviceId: DeviceId): Promise<void>

  getDeviceCapabilities(deviceId: DeviceId): Promise<DeviceCapability[]>

  getDeviceLocation(deviceId: DeviceId): Promise<string>

  enableDevice(deviceId: DeviceId): Promise<void>

  disableDevice(deviceId: DeviceId): Promise<void>
}
