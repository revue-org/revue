import { NotificationFactory } from '../NotificationFactory.js'
import { Intrusion } from '../../../alarm-system/core/Intrusion.js'
import { Notification } from '../../core/Notification.js'
import { NotificationImpl } from '../../core/impl/NotificationImpl.js'
import { Exceeding } from '../../../alarm-system/core/Exceeding.js'

export class NotificationFactoryImpl implements NotificationFactory {
  createExceedingNotification(id: string, exceeding: Exceeding): Notification {
    return new NotificationImpl(id, exceeding.timestamp, exceeding)
  }

  createIntrusionNotification(id: string, intrusion: Intrusion): Notification {
    return new NotificationImpl(id, intrusion.timestamp, intrusion)
  }
}
