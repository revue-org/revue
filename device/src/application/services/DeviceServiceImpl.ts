import { DeviceCapability } from '@/domain/core/capabilities/DeviceCapability'
import { DeviceRepository } from '../repositories/DeviceRepository'
import { DeviceService } from './DeviceService'
import { DeviceId } from '@/domain/core/DeviceId'
import { Device } from '@/domain/core/Device'
import { DeviceEndpoint } from '@/domain/core/DeviceEndpoint'
import { DeviceFactory } from '@/domain/factories/DeviceFactory'

export class DeviceServiceImpl implements DeviceService {
  private _repository: DeviceRepository

  constructor(repository: DeviceRepository) {
    this._repository = repository
  }

  async getDeviceCapabilities(deviceId: DeviceId): Promise<DeviceCapability[]> {
    const device: Device = await this._repository.getDeviceById(deviceId)
    return device.capabilities
  }

  async getDeviceLocation(deviceId: DeviceId): Promise<string> {
    const device: Device = await this._repository.getDeviceById(deviceId)
    return device.locationId
  }

  async getDeviceById(deviceId: DeviceId): Promise<Device> {
    return await this._repository.getDeviceById(deviceId)
  }

  async getDevices(): Promise<Device[]> {
    return await this._repository.getDevices()
  }

  async getActiveDevices(): Promise<Device[]> {
    return await this._repository.getActiveDevices()
  }

  async createDevice(
    description: string,
    endpoint: DeviceEndpoint,
    locationId: string,
    enabled: boolean,
    capabilities: DeviceCapability[]
  ): Promise<DeviceId> {
    const device: Device = DeviceFactory.newDevice(
      DeviceFactory.newId(),
      description,
      endpoint.ipAddress,
      endpoint.port,
      locationId,
      capabilities,
      enabled
    )
    await this._repository.saveDevice(device)
    return device.deviceId
  }

  updateDevice(
    deviceId: DeviceId,
    description: string,
    endpoint: DeviceEndpoint,
    locationId: string,
    enabled: boolean,
    capabilities: DeviceCapability[]
  ): Promise<void> {
    return this._repository.updateDevice(
      DeviceFactory.newDevice(
        deviceId,
        description,
        endpoint.ipAddress,
        endpoint.port,
        locationId,
        capabilities,
        enabled
      )
    )
  }

  async deleteDevice(deviceId: DeviceId): Promise<void> {
    return await this._repository.removeDevice(deviceId)
  }

  async enableDevice(deviceId: DeviceId): Promise<void> {
    return await this.toggleDevice(deviceId, true)
  }

  async disableDevice(deviceId: DeviceId): Promise<void> {
    return await this.toggleDevice(deviceId, false)
  }

  private async toggleDevice(deviceId: DeviceId, enabled: boolean): Promise<void> {
    const device: Device = await this._repository.getDeviceById(deviceId)
    await this._repository.updateDevice({ ...device, isEnabled: enabled })
  }
}
