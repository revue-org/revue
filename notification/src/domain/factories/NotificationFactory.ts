import { Notification } from '../core/Notification.js'
import { NotificationId } from '@/domain/core/NotificationId'
import { NotificationImpl } from '@/domain/core/impl/NotificationImpl'

export class NotificationFactory {

  static createNotification(id: NotificationId, message: string, event: DomainEvent): Notification {
    return new NotificationImpl(id, message, event)
  }

  static idOf(value: string): NotificationId {
    return { value }
  }
}
