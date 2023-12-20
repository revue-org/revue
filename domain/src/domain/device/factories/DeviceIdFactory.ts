import { DeviceId } from '../core/DeviceId.js'

export interface DeviceIdFactory {
  createCameraId(code: string): DeviceId

  createSensorId(code: string): DeviceId
}
