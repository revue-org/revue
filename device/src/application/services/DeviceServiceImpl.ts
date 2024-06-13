import { DeviceCapability } from '../../domain/core/capabilities/DeviceCapability'
import { Device } from '../../domain/core/Device'
import { DeviceEndpoint } from '../../domain/core/DeviceEndpoint'
import { DeviceId } from '../../domain/core/DeviceId'
import { DeviceFactory } from '../../domain/factories/DeviceFactory'
import { DeviceRepository } from '../repositories/DeviceRepository'
import { DeviceService } from './DeviceService'

export class DeviceServiceImpl implements DeviceService {
  private _repository: DeviceRepository

  constructor(repository: DeviceRepository) {
    this._repository = repository
  }

  getDeviceCapabilities(deviceId: DeviceId): Promise<DeviceCapability[]> {
    // returned by the device itself
    return this._repository.getDeviceById(deviceId).then(device => device.capabilities)
  }

  getDeviceLocation(deviceId: DeviceId): Promise<string> {
    return this._repository.getDeviceById(deviceId).then(device => device.locationId)
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
    return this._repository.deleteDevice(deviceId)
  }

  enableDevice(deviceId: DeviceId): Promise<void> {
    return this.toggleDevice(deviceId, true)
  }

  disableDevice(deviceId: DeviceId): Promise<void> {
    return this.toggleDevice(deviceId, false)
  }

  private async toggleDevice(deviceId: DeviceId, enabled: boolean): Promise<void> {
    const device = await this._repository.getDeviceById(deviceId)
    this._repository.updateDevice({ ...device, isEnabled: enabled })
  }
}
