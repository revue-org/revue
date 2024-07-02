import { Anomaly } from './Anomaly.js'
import { DomainEvent } from './DomainEvent.js'

export interface Outlier extends Anomaly {
  readonly type: 'outlier'

  readonly measurement: DomainEvent

  readonly rangeRuleId: string
}
