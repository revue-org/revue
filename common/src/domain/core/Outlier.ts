import { Anomaly } from './Anomaly.js'
import { DomainEventId } from './DomainEventId'
import { AnomalyType } from './AnomalyType'

export interface Outlier extends Anomaly {
  readonly type: AnomalyType.OUTLIER

  readonly measurementId: DomainEventId

  readonly rangeRuleId: string
}
