import { Notification } from '../core/Notification'
import { Exceeding } from '../../anomaly/core/Exceeding'
import { Intrusion } from '../../anomaly/core/Intrusion'

export interface NotificationFactory {
  createExceedingNotification(exceeding: Exceeding): Notification

  createIntrusionNotification(intrusion: Intrusion): Notification
}
