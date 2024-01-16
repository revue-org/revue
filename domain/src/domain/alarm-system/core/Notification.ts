import { Anomaly } from '../../anomaly/core/Anomaly.js'

export interface Notification {
  get notificationId(): string

  set notificationId(notificationId: string)

  get timestamp(): Date

  set timestamp(timestamp: Date)

  get anomaly(): Anomaly

  set anomaly(anomaly: Anomaly)
}
