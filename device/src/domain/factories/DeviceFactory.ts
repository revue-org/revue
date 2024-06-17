import { DeviceCapability } from '../core/capabilities/DeviceCapability'
import { Device } from '../core/Device'
import { DeviceEndpoint } from '../core/DeviceEndpoint'
import { DeviceId } from '../core/DeviceId'

export class DeviceFactory {
  static newId(): DeviceId {
    return {
      value: 'test'
    }
  }

  static idOf(id: string): DeviceId {
    return { value: id }
  }

  static endpointOf(ipAddress: string, port: number): DeviceEndpoint {
    return {
      ipAddress,
      port
    }
  }

  static newDevice(
    id: DeviceId,
    description: string,
    ipAddress: string,
    port: number,
    locationId: string,
    capabilities: DeviceCapability[],
    enabled: boolean
  ): Device {
    return {
      deviceId: id,
      description,
      endpoint: this.endpointOf(ipAddress, port),
      isEnabled: enabled,
      locationId: locationId,
      capabilities: capabilities
    }
  }
}
