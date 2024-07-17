import { DeviceFactory } from '@/domain/factories/DeviceFactory.js'
import { Device } from '@/domain/core/Device.js'
import { DeviceId } from '@/domain/core/DeviceId.js'
import { DeviceCapability } from '@/domain/core/capabilities/DeviceCapability.js'
import { CapabilityType } from '@/domain/core/capabilities/CapabilityType.js'
import { deviceService } from '@/setup.js'

export const deviceController = {
  getDeviceById: async (id: string): Promise<Device> => {
    return deviceService.getDeviceById(DeviceFactory.idOf(id))
  },
  getDevices: async (capabilities: CapabilityType[]): Promise<Device[]> => {
    return await deviceService.getDevices(capabilities)
  },
  getActiveDevices: async (): Promise<Device[]> => {
    return await deviceService.getActiveDevices()
  },
  createDevice: async (
    description: string,
    address: string,
    port: number
  ): Promise<DeviceId> => {
    return await deviceService.createDevice(
      description,
      DeviceFactory.endpointOf(address, port)
    )
  },
  updateDevice: async (
    id: string,
    description: string,
    address: string,
    port: number,
    locationId: string,
    enabled: boolean
  ): Promise<void> => {
    return await deviceService.updateDevice(
      DeviceFactory.idOf(id),
      description,
      DeviceFactory.endpointOf(address, port),
      locationId,
      enabled,
      []
    )
  },
  deleteDevice: async (id: string): Promise<void> => {
    return await deviceService.deleteDevice(DeviceFactory.idOf(id))
  },
  getDeviceCapabilities: async (id: string): Promise<DeviceCapability[]> => {
    return await deviceService.getDeviceCapabilities(DeviceFactory.idOf(id))
  },
  getDeviceLocation: async (id: string): Promise<string> => {
    return await deviceService.getDeviceLocation(DeviceFactory.idOf(id))
  },
  getDevicesByLocationId: async (locationId: string): Promise<Device[]> => {
    return await deviceService.getDevicesByLocationId(locationId)
  },
  enableDevice: async (id: string): Promise<void> => {
    return await deviceService.enableDevice(DeviceFactory.idOf(id))
  },
  disableDevice: async (id: string): Promise<void> => {
    return await deviceService.disableDevice(DeviceFactory.idOf(id))
  }
}
