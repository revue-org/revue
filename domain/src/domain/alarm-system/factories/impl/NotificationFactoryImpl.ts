import { NotificationFactory } from '../NotificationFactory.js'
import { Intrusion } from '../../../anomaly/core/Intrusion.js'
import { Notification } from '../../core/Notification.js'
import { NotificationImpl } from '../../core/impl/NotificationImpl.js'
import { Exceeding } from '../../../anomaly/core/Exceeding.js'

export class NotificationFactoryImpl implements NotificationFactory {
  createExceedingNotification(exceeding: Exceeding): Notification {
    return new NotificationImpl('', new Date(), exceeding)
  }

  createIntrusionNotification(intrusion: Intrusion): Notification {
    return new NotificationImpl('', new Date(), intrusion)
  }
}
