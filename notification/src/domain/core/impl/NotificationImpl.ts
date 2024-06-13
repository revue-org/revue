import { Notification } from '../Notification.js'
import { NotificationId } from '@/domain/core/NotificationId'

export class NotificationImpl implements Notification {
  private readonly _notificationId: NotificationId
  private readonly _message: string
  private readonly _event: DomainEvent

  constructor(notificationId: NotificationId, message: string, event: DomainEvent) {
    this._notificationId = notificationId
    this._message = message
    this._event = event
  }

  get notificationId(): NotificationId {
    return this._notificationId
  }

  get message(): string {
    return this._message
  }

  get event(): DomainEvent {
    return this._event
  }

}
