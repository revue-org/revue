import { NotificationFactory } from '../NotificationFactory.js'
import { Intrusion } from '../../../anomaly/core/Intrusion.js'
import { Notification } from '../../core/Notification.js'
import { NotificationImpl } from '../../core/impl/NotificationImpl.js'
import { Exceeding } from '../../../anomaly/core/Exceeding.js'

export class NotificationFactoryImpl implements NotificationFactory {
  createExceedingNotification(id:string = '', exceeding: Exceeding): Notification {
    return new NotificationImpl(id, new Date(), exceeding)
  }

  createIntrusionNotification(id:string = '', intrusion: Intrusion): Notification {
    return new NotificationImpl(id, new Date(), intrusion)
  }
}
