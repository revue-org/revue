import { DeviceId } from '../../device/core/DeviceId'

export interface Anomaly {
  get anomalyId(): number

  set anomalyId(anomalyId: number)

  get deviceId(): DeviceId

  set deviceId(deviceId: DeviceId)

  get timestamp(): Date

  set timestamp(timestamp: Date)
}
