import { Notification } from '../core/Notification.js'
import { NotificationId } from '@/domain/core/NotificationId'
import { DomainEvent } from '@common/domain/core/DomainEvent'

export class NotificationFactory {
  static newId(): NotificationId {
    return { value: 'test' }
  }
  static idOf(value: string): NotificationId {
    return { value }
  }

  static createNotification(event: DomainEvent, message: string): Notification {
    return this.notificationFrom(this.newId(), event, message)
  }

  static notificationFrom(id: NotificationId, event: DomainEvent, message: string): Notification {
    return {
      id,
      event,
      message
    }
  }
}
