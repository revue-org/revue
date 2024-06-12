import { Anomaly } from './Anomaly.js'
import { DomainEventId } from "./DomainEventId";
import { AnomalyType } from "./AnomalyType";

export interface Outlier extends Anomaly {
  type: AnomalyType.OUTLIER

  measurementId: DomainEventId

  rangeRuleId: string

}
