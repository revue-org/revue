import { DeviceCapability } from '@/domain/core/capabilities/DeviceCapability.js'
import { DeviceRepository } from '../repositories/DeviceRepository.js'
import { DeviceService } from './DeviceService.js'
import { DeviceId } from '@/domain/core/DeviceId.js'
import { Device } from '@/domain/core/Device.js'
import { DeviceEndpoint } from '@/domain/core/DeviceEndpoint.js'
import { DeviceFactory } from '@/domain/factories/DeviceFactory.js'
import { CapabilityType } from '@/domain/core/capabilities/CapabilityType'
import RequestHelper from '@utils/RequestHelper.js'
import { DeviceEventsHub } from '@/application/services/DeviceEventsHub'
import { CapabilityFactory } from '@/domain/factories/CapabilityFactory'
import { MeasureFactory } from '@common/domain/factories/MeasureFactory.js'

export class DeviceServiceImpl implements DeviceService {
  private _repository: DeviceRepository
  // TODO decomment publishers
  private _events: DeviceEventsHub

  constructor(repository: DeviceRepository) {
    this._repository = repository
    this._events = {} as DeviceEventsHub
  }

  async getDeviceCapabilities(deviceId: DeviceId): Promise<DeviceCapability[]> {
    const device: Device = await this._repository.getDeviceById(deviceId)
    return RequestHelper.get(
      'http://' + device.endpoint.ipAddress + ':' + device.endpoint.port + '/capabilities'
    ).then((res: any): DeviceCapability[] => {
      const capabilities: DeviceCapability[] = []
      for (let i: number = 0; i < res.data.capabilities; i++) {
        if (res.data.capabilities[i].type == CapabilityType.SENSOR) {
          capabilities.push(
            CapabilityFactory.sensoringCapabilityOf(
              res.data.capabilities[i].capturingInterval,
              MeasureFactory.createMeasure(
                res.data.capabilities[i].measure.type,
                res.data.capabilities[i].measure.unit
              )
            )
          )
        } else if (res.data.capabilities[i].type == CapabilityType.VIDEO) {
          capabilities.push(CapabilityFactory.videoStreamingCapabilityOf(res.data.capabilities[i].resolution))
        }
      }
      return capabilities
    })
  }

  async getDeviceLocation(deviceId: DeviceId): Promise<string> {
    const device: Device = await this._repository.getDeviceById(deviceId)
    return device.locationId
  }

  async getDeviceById(deviceId: DeviceId): Promise<Device> {
    return await this._repository.getDeviceById(deviceId)
  }

  async getDevices(capabilities: CapabilityType[] = []): Promise<Device[]> {
    if (capabilities.length > 0) return await this.getDeviceWithCapabilities(capabilities)
    return await this._repository.getDevices()
  }

  private async getDeviceWithCapabilities(capabilities: CapabilityType[]): Promise<Device[]> {
    const devices: Device[] = await this._repository.getDevices()
    const admittedDevices: Device[] = []

    devices.forEach((device: Device): void => {
      RequestHelper.get(
        'http://' + device.endpoint.ipAddress + ':' + device.endpoint.port + '/capabilities'
      ).then((res: any): void => {
        if (
          res.data.capabilities.forEach((capability: string): boolean =>
            capabilities.includes(capability as CapabilityType)
          )
        ) {
          admittedDevices.push(device)
        }
      })
    })
    return admittedDevices
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
    const device: Device = DeviceFactory.deviceFrom(
      DeviceFactory.newId(),
      description,
      endpoint.ipAddress,
      endpoint.port,
      locationId,
      capabilities,
      enabled
    )
    await this._repository.saveDevice(device)
    //this._events.publishDeviceAdded(DeviceEventFactory.createAddition(new Date(), device.deviceId.value));
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
      DeviceFactory.deviceFrom(
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
    await this._repository.removeDevice(deviceId)
    //this._events.publishDeviceRemoved(DeviceEventFactory.createRemoval(new Date(), deviceId.value));
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
