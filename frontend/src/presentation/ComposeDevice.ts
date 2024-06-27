import type { Device } from '@/domain/core/Device'

export const composeDevice = (sensor: any): Device => {
  return {
    deviceId: sensor.deviceId.value,
    description: sensor.description,
    endpoint: sensor.endpoint.ipAddress + ':' + sensor.endpoint.port,
    isEnabled: sensor.isEnabled,
    locationId: sensor.locationId
  }
}