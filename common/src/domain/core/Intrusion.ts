import { Anomaly } from './Anomaly.js'
import { DomainEventId } from "./DomainEventId";
import { AnomalyType } from "./AnomalyType";

export interface Intrusion extends Anomaly {
  type : AnomalyType.INTRUSION

  detectionId : DomainEventId

  intrusionRuleId: string
}
