import { Anomaly } from './Anomaly.js'
import { DomainEventId } from './DomainEventId'

export interface Intrusion extends Anomaly {
  readonly type: 'intrusion'

  readonly detectionId: DomainEventId

  readonly intrusionRuleId: string
}
