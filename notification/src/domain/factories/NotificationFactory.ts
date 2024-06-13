import { Notification } from '../core/Notification.js'
import { NotificationId } from '@/domain/core/NotificationId'

export class NotificationFactory {
  static createNotification(id: NotificationId, message: string, event: DomainEvent): Notification {
    return {
      notificationId: id,
      message,
      event
    }
  }

  static idOf(value: string): NotificationId {
    return { value }
  }
}
