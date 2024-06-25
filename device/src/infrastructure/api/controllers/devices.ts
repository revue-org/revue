import { DeviceFactory } from '@/domain/factories/DeviceFactory.js'
import { Device } from '@/domain/core/Device.js'
import { DeviceId } from '@/domain/core/DeviceId.js'
import { DeviceCapability } from '@/domain/core/capabilities/DeviceCapability.js'
import { CapabilityType } from '@/domain/core/capabilities/CapabilityType.js'
import { alarmService } from '@/setup.js'

export const deviceController = {
  getDeviceById: async (id: string): Promise<Device> => {
    return alarmService.getDeviceById(DeviceFactory.idOf(id))
  },
  getDevices: async (capabilities: CapabilityType[]): Promise<Device[]> => {
    return await alarmService.getDevices(capabilities)
  },
  getActiveDevices: async (): Promise<Device[]> => {
    return await alarmService.getActiveDevices()
  },
  createDevice: async (
    description: string,
    address: string,
    port: number,
    locationId: string
  ): Promise<DeviceId> => {
    return await alarmService.createDevice(
      description,
      DeviceFactory.endpointOf(address, port),
      locationId,
      true,
      []
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
    return await alarmService.updateDevice(
      DeviceFactory.idOf(id),
      description,
      DeviceFactory.endpointOf(address, port),
      locationId,
      enabled,
      []
    )
  },
  deleteDevice: async (id: string): Promise<void> => {
    return await alarmService.deleteDevice(DeviceFactory.idOf(id))
  },
  getDeviceCapabilities: async (id: string): Promise<DeviceCapability[]> => {
    return await alarmService.getDeviceCapabilities(DeviceFactory.idOf(id))
  },
  getDeviceLocation: async (id: string): Promise<string> => {
    return await alarmService.getDeviceLocation(DeviceFactory.idOf(id))
  },
  enableDevice: async (id: string): Promise<void> => {
    return await alarmService.enableDevice(DeviceFactory.idOf(id))
  },
  disableDevice: async (id: string): Promise<void> => {
    return await alarmService.disableDevice(DeviceFactory.idOf(id))
  }
}
