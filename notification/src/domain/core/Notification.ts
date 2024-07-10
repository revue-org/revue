import { NotificationId } from '@/domain/core/NotificationId'
import { DomainEvent } from '@common/domain/core/DomainEvent'

export interface Notification {
  readonly id: NotificationId

  readonly event: DomainEvent

  readonly message: string
}
