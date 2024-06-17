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
    // returned by the device itself
    const device = await this._repository.getDeviceById(deviceId)
    return device.capabilities
  }

  async getDeviceLocation(deviceId: DeviceId): Promise<string> {
    const device = await this._repository.getDeviceById(deviceId)
    return device.locationId
  }

  getDevice(deviceId: DeviceId): Promise<Device> {
    return this._repository.getDeviceById(deviceId)
  }

  getDevices(): Promise<Device[]> {
    return this._repository.getDevices()
  }

  createDevice(
    description: string,
    endpoint: DeviceEndpoint,
    locationId: string,
    enabled: boolean,
    capabilities: DeviceCapability[]
  ): Promise<void> {
    return this._repository.saveDevice(
      DeviceFactory.newDevice(
        DeviceFactory.idOf(''),
        description,
        endpoint.ipAddress,
        endpoint.port,
        locationId,
        capabilities,
        enabled
      )
    )
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

  deleteDevice(deviceId: DeviceId): Promise<void> {
    return this._repository.removeDevice(deviceId)
  }

  enableDevice(deviceId: DeviceId): Promise<void> {
    return this.toggleDevice(deviceId, true)
  }

  disableDevice(deviceId: DeviceId): Promise<void> {
    return this.toggleDevice(deviceId, false)
  }

  private async toggleDevice(deviceId: DeviceId, enabled: boolean): Promise<void> {
    const device: Device = await this._repository.getDeviceById(deviceId)
    await this._repository.updateDevice({ ...device, isEnabled: enabled })
  }
}
