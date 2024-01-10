import { Notification } from '../core/Notification.js'
import { Exceeding } from '../../anomaly/core/Exceeding.js'
import { Intrusion } from '../../anomaly/core/Intrusion.js'

export interface NotificationFactory {
  createExceedingNotification(exceeding: Exceeding): Notification

  createIntrusionNotification(intrusion: Intrusion): Notification
}
