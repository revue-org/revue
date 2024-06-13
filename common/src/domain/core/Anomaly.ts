import { DomainEvent } from './DomainEvent'
import { AnomalyType } from './AnomalyType'

export interface Anomaly extends DomainEvent {
  readonly type: AnomalyType
}
