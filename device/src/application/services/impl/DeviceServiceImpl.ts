import { DeviceCapability } from '@/domain/core/capabilities/DeviceCapability.js'
import { DeviceRepository } from '../../repositories/DeviceRepository.js'
import { DeviceService } from '../DeviceService.js'
import { DeviceId } from '@/domain/core/DeviceId.js'
import { Device } from '@/domain/core/Device.js'
import { DeviceEndpoint } from '@/domain/core/DeviceEndpoint.js'
import { DeviceFactory } from '@/domain/factories/DeviceFactory.js'
import { CapabilityType } from '@/domain/core/capabilities/CapabilityType.js'
import RequestHelper from '@common/utils/RequestHelper.js'
import { DeviceEventsHub } from '@/application/services/DeviceEventsHub.js'
import { CapabilityFactory } from '@/domain/factories/CapabilityFactory.js'
import { MeasureFactory } from '@common/domain/factories/MeasureFactory.js'
import { DeviceEventFactory } from '@common/domain/factories/DeviceEventFactory.js'

export class DeviceServiceImpl implements DeviceService {
  private readonly repository: DeviceRepository
  private readonly events: DeviceEventsHub

  constructor(repository: DeviceRepository, events: DeviceEventsHub) {
    this.repository = repository
    this.events = events
  }

  async getDeviceCapabilities(deviceId: DeviceId): Promise<DeviceCapability[]> {
    const device: Device = await this.repository.getDeviceById(deviceId)
    return RequestHelper.get(
      'http://' + device.endpoint.ipAddress + ':' + device.endpoint.port + '/capabilities'
    )
      .then((res: any): DeviceCapability[] => {
        const capabilities: DeviceCapability[] = []
        for (let i: number = 0; i < res.data.capabilities.length; i++) {
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
            capabilities.push(
              CapabilityFactory.videoStreamingCapabilityOf(res.data.capabilities[i].resolution)
            )
          }
        }
        return capabilities
      })
      .catch((error: any): DeviceCapability[] => {
        console.log('Error while fetching capabilities for device: ' + deviceId.value + 'error:' + error)
        return []
      })
  }

  async getDeviceLocation(deviceId: DeviceId): Promise<string> {
    const device: Device = await this.repository.getDeviceById(deviceId)
    return device.locationId
  }

  async getDevicesByLocationId(locationId: string): Promise<Device[]> {
    return await this.repository.getDevicesByLocationId(locationId)
  }

  async getDeviceById(deviceId: DeviceId): Promise<Device> {
    return await this.repository.getDeviceById(deviceId)
  }

  async getDevices(capabilities: CapabilityType[] = []): Promise<Device[]> {
    if (capabilities.length > 0) return await this.getDeviceWithCapabilities(capabilities)
    return await this.repository.getDevices()
  }

  private async getDeviceWithCapabilities(requiredCapabilities: CapabilityType[]): Promise<Device[]> {
    const devices: Device[] = await this.repository.getDevices()
    const admittedDevices: Device[] = []
    for (const device of devices) {
      if (device.isEnabled) {
        try {
          const res = await RequestHelper.get(
            `http://${device.endpoint.ipAddress}:${device.endpoint.port}/capabilities`
          )
          const deviceCapabilityTypes: CapabilityType[] = res.data.capabilities.map(
            (capability: any): CapabilityType => {
              if (Object.values(CapabilityType).includes(capability.type as CapabilityType)) {
                return capability.type as CapabilityType
              } else {
                throw new Error('Invalid capability')
              }
            }
          )

          if (requiredCapabilities.every(capability => deviceCapabilityTypes.includes(capability))) {
            admittedDevices.push(device)
          }
        } catch (error) {
          console.log(`Error while fetching capabilities from ${device.deviceId.value}: ${error}`)
        }
      }
    }
    return admittedDevices
  }

  async getActiveDevices(): Promise<Device[]> {
    return await this.repository.getActiveDevices()
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
    await this.repository.saveDevice(device)
    this.events.publishDeviceAdded(DeviceEventFactory.createAddition(new Date(), device.deviceId.value))
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
    return this.repository.updateDevice(
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
    await this.repository.removeDevice(deviceId)
    this.events.publishDeviceRemoved(DeviceEventFactory.createRemoval(new Date(), deviceId.value))
  }

  async enableDevice(deviceId: DeviceId): Promise<void> {
    return await this.toggleDevice(deviceId, true)
  }

  async disableDevice(deviceId: DeviceId): Promise<void> {
    return await this.toggleDevice(deviceId, false)
  }

  private async toggleDevice(deviceId: DeviceId, enabled: boolean): Promise<void> {
    const device: Device = await this.repository.getDeviceById(deviceId)
    await this.repository.updateDevice({ ...device, isEnabled: enabled })
  }
}
