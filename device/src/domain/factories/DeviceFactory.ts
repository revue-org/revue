import { DeviceCapability } from '../core/capabilities/DeviceCapability'
import { Device } from '../core/Device'
import { DeviceEndpoint } from '../core/DeviceEndpoint'
import { DeviceId } from '../core/DeviceId'
import { v4 as uuidv4 } from 'uuid'

export class DeviceFactory {
  static newId(): DeviceId {
    return { value: uuidv4() }
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

  static deviceFrom(
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

  static createDevice(
    description: string,
    ipAddress: string,
    port: number,
    locationId: string,
    capabilities: DeviceCapability[],
    enabled: boolean
  ): Device {
    return this.deviceFrom(this.newId(), description, ipAddress, port, locationId, capabilities, enabled)
  }
}
