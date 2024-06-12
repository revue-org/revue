import { DomainEventId } from "./DomainEventId";

export interface DomainEvent {
  get id(): DomainEventId;

  get timestamp(): Date;
}