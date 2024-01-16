import { DeviceId } from '../../device/core/DeviceId.js'

export interface Anomaly {
  get anomalyId(): string

  set anomalyId(anomalyId: string)

  get deviceId(): DeviceId

  set deviceId(deviceId: DeviceId)

  get timestamp(): Date

}
