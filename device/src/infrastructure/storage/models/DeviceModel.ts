import { Device } from '@/domain/core/Device.js'
import { DeviceFactory } from '@/domain/factories/DeviceFactory.js'

export interface DeviceDBEntity {
  readonly id: string
  readonly description: string
  readonly locationId: string
  readonly endpoint: {
    readonly ipAddress: string
    readonly port: number
  }
  readonly isEnabled: boolean
}

export class DeviceDBAdapter {
  static toDomainEntity(device: DeviceDBEntity): Device {
    return DeviceFactory.deviceFrom(
      DeviceFactory.idOf(device.id),
      device.description,
      device.endpoint.ipAddress,
      device.endpoint.port,
      device.locationId,
      [],
      device.isEnabled
    )
  }

  static toDBEntity(device: Device): DeviceDBEntity {
    return {
      id: device.deviceId.value,
      description: device.description,
      locationId: device.locationId,
      endpoint: {
        ipAddress: device.endpoint.ipAddress,
        port: device.endpoint.port
      },
      isEnabled: device.isEnabled
    }
  }
}
