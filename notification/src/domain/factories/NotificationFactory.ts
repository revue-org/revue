import { Notification } from '../core/Notification.js'
import { NotificationId } from '@/domain/core/NotificationId'
import { DomainEvent } from '@common/domain/core/DomainEvent'
import { v4 as uuidv4 } from 'uuid'

export class NotificationFactory {
  static newId(): NotificationId {
    return { value: uuidv4() }
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
