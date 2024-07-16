import { DeviceCapability } from '@/domain/core/capabilities/DeviceCapability.js'
import { DeviceRepository } from '../../repositories/DeviceRepository.js'
import { DeviceService } from '../DeviceService.js'
import { DeviceId } from '@/domain/core/DeviceId.js'
import { Device } from '@/domain/core/Device.js'
import { DeviceEndpoint } from '@/domain/core/DeviceEndpoint.js'
import { DeviceFactory } from '@/domain/factories/DeviceFactory.js'
import { CapabilityType } from '@/domain/core/capabilities/CapabilityType.js'
import { DeviceEventsHub } from '@/application/services/DeviceEventsHub.js'
import { DeviceEventFactory } from '@common/domain/factories/DeviceEventFactory.js'
import { Servient } from '@node-wot/core'
import HttpClientFactory from '@node-wot/binding-http'
import { CapabilityFactory } from '@/domain/factories/CapabilityFactory.js'
import { MeasureFactory } from '@common/domain/factories/MeasureFactory.js'

const Server = HttpClientFactory.HttpClientFactory

export class DeviceServiceImpl implements DeviceService {
  private readonly repository: DeviceRepository
  private readonly events: DeviceEventsHub
  private readonly servient: Servient

  constructor(repository: DeviceRepository, events: DeviceEventsHub) {
    this.repository = repository
    this.events = events
    this.servient = new Servient()
    this.servient.addClientFactory(new Server(null))
  }

  async getDeviceCapabilities(deviceId: DeviceId): Promise<DeviceCapability[]> {
    const device: Device = await this.repository.getDeviceById(deviceId)
    return await this.servient
      .start()
      .then(async (WoT: any): Promise<DeviceCapability[]> => {
        const td = await WoT.requestThingDescription(
          `http://${device.endpoint.ipAddress}:${device.endpoint.port}/device-${deviceId.value}`
        )
        const thing = await WoT.consume(td)
        return thing.readProperty('status').then(async (data: any): Promise<DeviceCapability[]> => {
          const deviceStatus = await data.value()
          const capabilities: DeviceCapability[] = []
          for (let i: number = 0; i < deviceStatus.capabilities.length; i++) {
            if (deviceStatus.capabilities[i].type == CapabilityType.SENSOR) {
              capabilities.push(
                CapabilityFactory.sensoringCapabilityOf(
                  deviceStatus.capabilities[i].capturingInterval,
                  MeasureFactory.createMeasure(
                    deviceStatus.capabilities[i].measure.type,
                    deviceStatus.capabilities[i].measure.unit
                  )
                )
              )
            } else if (deviceStatus.capabilities[i].type == CapabilityType.VIDEO) {
              capabilities.push(
                CapabilityFactory.videoStreamingCapabilityOf(deviceStatus.capabilities[i].resolution)
              )
            }
          }
          return capabilities
        })
      })
      .catch((err: any) => {
        console.error(err)
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
      await this.servient.start().then(async (WoT: any): Promise<void> => {
        const td = await WoT.requestThingDescription(
          `http://${device.endpoint.ipAddress}:${device.endpoint.port}/device-${device.deviceId.value}`
        )
        const thing = await WoT.consume(td)
        await thing.readProperty('status').then(async (data: any): Promise<void> => {
          const deviceStatus = await data.value()
          if (deviceStatus.enabled) {
            const deviceCapabilityTypes: CapabilityType[] = deviceStatus.capabilities.map(
              (capability: any): CapabilityType => {
                return capability.type as CapabilityType
              }
            )
            if (requiredCapabilities.every(capability => deviceCapabilityTypes.includes(capability))) {
              admittedDevices.push(device)
            }
          }
        })
      })
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
    await this.servient.start().then(async (WoT: any): Promise<void> => {
      const td = await WoT.requestThingDescription(
        `http://${device.endpoint.ipAddress}:${device.endpoint.port}/device-${deviceId.value}`
      )
      const thing = await WoT.consume(td)
      await thing.invokeAction('toggle', { enable: enabled })
      await thing.readProperty('status').then(async (data: any): Promise<void> => {
        const deviceStatus = await data.value()
        await this.repository.updateDevice({ ...device, isEnabled: deviceStatus.enabled })
      })
    })

  }
}
