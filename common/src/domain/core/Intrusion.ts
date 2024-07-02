import { Anomaly } from './Anomaly.js'
import { DomainEvent } from './DomainEvent.js'

export interface Intrusion extends Anomaly {
  readonly type: 'intrusion'

  readonly detection: DomainEvent

  readonly intrusionRuleId: string
}
