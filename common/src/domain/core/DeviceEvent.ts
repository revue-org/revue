import { DomainEvent } from './DomainEvent'

export interface DeviceEvent extends DomainEvent {
  readonly sourceDeviceId: string
}
