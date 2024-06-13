import { NotificationId } from '@/domain/core/NotificationId'

export interface Notification {
  get notificationId(): NotificationId

  get message(): string

  get event(): DomainEvent
}
