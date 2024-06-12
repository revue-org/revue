import { DomainEvent } from "./DomainEvent";

export interface DeviceEvent extends DomainEvent {
  get sourceDeviceId(): string;
}