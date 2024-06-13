import { DomainEventId } from "./DomainEventId";

export interface DomainEvent {
  readonly id: DomainEventId;

  readonly timestamp: Date;
}