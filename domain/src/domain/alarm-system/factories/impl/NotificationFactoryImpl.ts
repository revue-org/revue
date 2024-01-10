import { NotificationFactory } from '../NotificationFactory.js'
import { Intrusion } from '../../../anomaly/core/Intrusion.js'
import { Notification } from '../../core/Notification.js'
import { NotificationImpl } from '../../core/impl/NotificationImpl.js'
import { Exceeding } from '../../../anomaly/core/Exceeding.js'

export class NotificationFactoryImpl implements NotificationFactory {
  createExceedingNotification(exceeding: Exceeding): Notification {
    //TODO to get a notificationId, we need to get the last notificationId from the database
    return new NotificationImpl("4343434", new Date(), exceeding)
  }

  createIntrusionNotification(intrusion: Intrusion): Notification {
    //TODO to get a notificationId, we need to get the last notificationId from the database
    return new NotificationImpl("4343434", new Date(), intrusion)
  }
}
