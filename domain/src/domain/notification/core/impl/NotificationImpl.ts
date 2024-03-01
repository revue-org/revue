import { Notification } from '../Notification.js'
import { Anomaly } from '../../../alarm-system/core/Anomaly.js'

export class NotificationImpl implements Notification {
  private _notificationId: string
  private readonly _timestamp: Date
  private _anomaly: Anomaly

  constructor(notificationId: string = '', timestamp: Date, anomaly: Anomaly) {
    this._notificationId = notificationId
    this._timestamp = timestamp
    this._anomaly = anomaly
  }

  get notificationId(): string {
    return this._notificationId
  }

  set notificationId(notificationId: string) {
    this._notificationId = notificationId
  }

  get timestamp(): Date {
    return this._timestamp
  }

  get anomaly(): Anomaly {
    return this._anomaly
  }

  set anomaly(anomaly: Anomaly) {
    this._anomaly = anomaly
  }
}
