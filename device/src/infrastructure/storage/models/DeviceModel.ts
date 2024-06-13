import { Device } from "../../../domain/core/Device"
import { DeviceFactory } from "../../../domain/factories/DeviceFactory"

export interface DeviceDBEntity {
    readonly id: string
    readonly description: string
    readonly locationId: string
    readonly endpoint: {
        readonly ipAddress: string
        readonly port: number
    }
    readonly enabled: boolean
}

export class DeviceDBAdapter {
    static toDomainEntity(device: DeviceDBEntity): Device {
        return DeviceFactory.newDevice(
            DeviceFactory.idOf(device.id),
            device.description,
            device.endpoint.ipAddress,
            device.endpoint.port,
            device.locationId,
            [],
            device.enabled
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
            enabled: device.isEnabled
        }
    }
}