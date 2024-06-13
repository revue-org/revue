import { Anomaly } from './Anomaly.js'
import { DomainEventId } from "./DomainEventId";
import { AnomalyType } from "./AnomalyType";

export interface Intrusion extends Anomaly {
  readonly type : AnomalyType.INTRUSION

  readonly detectionId : DomainEventId

  readonly intrusionRuleId: string
}
