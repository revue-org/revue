export interface Anomaly {
  get anomalyId(): number

  set anomalyId(anomalyId: number)

  get deviceId(): number

  set deviceId(deviceId: number)

  get timestamp(): Date

  set timestamp(timestamp: Date)
}
