import { Anomaly } from './Anomaly.js'
import { DomainEventId } from './DomainEventId'

export interface Outlier extends Anomaly {
  readonly type: "outlier"

  readonly measurementId: DomainEventId

  readonly rangeRuleId: string
}
