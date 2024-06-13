import { DeviceCapability } from "./capabilities/DeviceCapability"
import { DeviceEndpoint } from "./DeviceEndpoint"
import { DeviceId } from "./DeviceId"

export interface Device {
    readonly deviceId: DeviceId
    readonly description: string
    readonly endpoint: DeviceEndpoint
    readonly isEnabled: boolean
    readonly locationId: string
    readonly capabilities: DeviceCapability[]
}