import { DomainEvent } from './DomainEvent'

export interface Anomaly extends DomainEvent {
  readonly type: "outlier" | "intrusion"
}
