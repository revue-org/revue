import { Notification } from '../core/Notification.js'
import { NotificationId } from '@/domain/core/NotificationId'
import { DomainEvent } from '@common/domain/core/DomainEvent'
import { DomainEventType } from 'common/dist/domain/core/DomainEventType'

export class NotificationFactory {
  static idOf(value: string): NotificationId {
    return { value }
  }

  static createNotification(
    id: NotificationId,
    type: DomainEventType,
    event: DomainEvent,
    message: string
  ): Notification {
    return {
      id,
      type,
      event,
      message
    }
  }
}
