import { NotificationId } from '@/domain/core/NotificationId'
import { DomainEvent } from '@common/domain/core/DomainEvent'
import { DomainEventType } from '@common/domain/core/DomainEventType'

export interface Notification {
  readonly id: NotificationId

  readonly type: DomainEventType

  readonly event: DomainEvent

  readonly message: string
}
