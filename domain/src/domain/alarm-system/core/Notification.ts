import { Anomaly } from '../../anomaly/core/Anomaly'

export interface Notification {
  get notificationId(): number

  set notificationId(notificationId: number)

  get timestamp(): Date

  set timestamp(timestamp: Date)

  get anomaly(): Anomaly

  set anomaly(anomaly: Anomaly)
}
