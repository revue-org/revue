import { Notification } from '../core/Notification.js'
import { Exceeding } from '../../alarm-system/core/Exceeding.js'
import { Intrusion } from '../../alarm-system/core/Intrusion.js'

export interface NotificationFactory {
  createExceedingNotification(id: string, exceeding: Exceeding): Notification

  createIntrusionNotification(id: string, intrusion: Intrusion): Notification
}
