import { Notification } from '../core/Notification.js'
import { Exceeding } from '../../anomaly/core/Exceeding.js'
import { Intrusion } from '../../anomaly/core/Intrusion.js'

export interface NotificationFactory {
  createExceedingNotification(id:string, exceeding: Exceeding): Notification

  createIntrusionNotification(id:string, intrusion: Intrusion): Notification
}
