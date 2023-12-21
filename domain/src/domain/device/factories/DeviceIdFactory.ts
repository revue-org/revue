import { DeviceId } from '../core/DeviceId.js'
import { DeviceType } from "../core/impl/enum/DeviceType.js";

export interface DeviceIdFactory {
  createId(type: DeviceType, code: string): DeviceId

  createCameraId(code: string): DeviceId

  createSensorId(code: string): DeviceId
}
