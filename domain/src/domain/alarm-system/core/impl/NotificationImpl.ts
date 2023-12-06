import { Notification } from '../Notification'
import { Anomaly } from '../../../anomaly/core/Anomaly'

export class NotificationImpl implements Notification {
  private _notificationId: number
  private _timestamp: Date
  private _anomaly: Anomaly

  constructor(notificationId: number, timestamp: Date, anomaly: Anomaly) {
    this._notificationId = notificationId
    this._timestamp = timestamp
    this._anomaly = anomaly
  }

  get notificationId(): number {
    return this._notificationId
  }

  set notificationId(notificationId: number) {
    this._notificationId = notificationId
  }

  get timestamp(): Date {
    return this._timestamp
  }

  set timestamp(timestamp: Date) {
    this._timestamp = timestamp
  }

  get anomaly(): Anomaly {
    return this._anomaly
  }

  set anomaly(anomaly: Anomaly) {
    this._anomaly = anomaly
  }
}
