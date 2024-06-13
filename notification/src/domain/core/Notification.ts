import { NotificationId } from '@/domain/core/NotificationId'

export interface Notification {
  readonly notificationId: NotificationId

  readonly message: string

  readonly event: DomainEvent
}
