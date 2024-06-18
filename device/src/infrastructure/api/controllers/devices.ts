import { MongoDBDeviceRepository } from '@/infrastructure/storage/MongoDBDeviceRepository'
import { DeviceServiceImpl } from '@/application/services/DeviceServiceImpl'
import { DeviceService } from '@/application/services/DeviceService'
import { DeviceFactory } from '@/domain/factories/DeviceFactory'
import { Device } from '@/domain/core/Device'
import { DeviceId } from '@/domain/core/DeviceId'
import { DeviceCapability } from '@/domain/core/capabilities/DeviceCapability'

const service: DeviceService = new DeviceServiceImpl(new MongoDBDeviceRepository())

export const deviceController = {
  getDeviceById: async (id: string): Promise<Device> => {
    return service.getDeviceById(DeviceFactory.idOf(id))
  },
  getDevices: async (): Promise<Device[]> => {
    return await service.getDevices()
  },
  getActiveDevices: async (): Promise<Device[]> => {
    return await service.getActiveDevices()
  },
  createDevice: async (
    description: string,
    address: string,
    port: number,
    locationId: string,
    capabilities: DeviceCapability[]
  ): Promise<DeviceId> => {
    return await service.createDevice(
      description,
      DeviceFactory.endpointOf(address, port),
      locationId,
      true,
      capabilities
    )
  },
  updateDevice: async (
    id: string,
    description: string,
    address: string,
    port: number,
    locationId: string,
    enabled: boolean,
    capabilities: DeviceCapability[]
  ): Promise<void> => {
    return await service.updateDevice(
      DeviceFactory.idOf(id),
      description,
      DeviceFactory.endpointOf(address, port),
      locationId,
      enabled,
      capabilities
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
