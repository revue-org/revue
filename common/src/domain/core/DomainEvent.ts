import { DomainEventId } from './DomainEventId'

export interface DomainEvent {
  readonly id: DomainEventId

  readonly type: any

  readonly timestamp: Date
}
