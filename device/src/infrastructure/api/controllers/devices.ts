import { MongoDBDeviceRepository } from '@/infrastructure/storage/MongoDBDeviceRepository.js'
import { DeviceServiceImpl } from '@/application/services/DeviceServiceImpl.js'
import { DeviceService } from '@/application/services/DeviceService.js'
import { DeviceFactory } from '@/domain/factories/DeviceFactory.js'
import { Device } from '@/domain/core/Device.js'
import { DeviceId } from '@/domain/core/DeviceId.js'
import { DeviceCapability } from '@/domain/core/capabilities/DeviceCapability.js'
import { CapabilityType } from '@/domain/core/capabilities/CapabilityType'

const service: DeviceService = new DeviceServiceImpl(new MongoDBDeviceRepository())

export const deviceController = {
  getDeviceById: async (id: string): Promise<Device> => {
    return service.getDeviceById(DeviceFactory.idOf(id))
  },
  getDevices: async (capabilities: CapabilityType[]): Promise<Device[]> => {
    return await service.getDevices(capabilities)
  },
  getActiveDevices: async (): Promise<Device[]> => {
    return await service.getActiveDevices()
  },
  createDevice: async (
    description: string,
    address: string,
    port: number,
    locationId: string
  ): Promise<DeviceId> => {
    return await service.createDevice(
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
    return await service.updateDevice(
      DeviceFactory.idOf(id),
      description,
      DeviceFactory.endpointOf(address, port),
      locationId,
      enabled,
      []
    )
  },
  deleteDevice: async (id: string): Promise<void> => {
    return await service.deleteDevice(DeviceFactory.idOf(id))
  },
  getDeviceCapabilities: async (id: string): Promise<DeviceCapability[]> => {
    return await service.getDeviceCapabilities(DeviceFactory.idOf(id))
  },
  getDeviceLocation: async (id: string): Promise<string> => {
    return await service.getDeviceLocation(DeviceFactory.idOf(id))
  },
  enableDevice: async (id: string): Promise<void> => {
    return await service.enableDevice(DeviceFactory.idOf(id))
  },
  disableDevice: async (id: string): Promise<void> => {
    return await service.disableDevice(DeviceFactory.idOf(id))
  }
}
