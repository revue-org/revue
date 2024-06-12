import { DomainEventId } from "../core/DomainEventId";
import { Intrusion } from "../core/Intrusion";
import { Outlier } from "../core/Outlier";
import { AnomalyType } from "../core/AnomalyType";

export class AnomalyFactory {

  static newId(): DomainEventId {
    return {
      id: "test"
    };
  }

  static idOf(id: string): DomainEventId {
    return { id };
  }

  static createOutlier(
    id: DomainEventId,
    timestamp: Date,
    measurementId: DomainEventId,
    rangeRuleId: string
  ): Outlier {
    return {
      id,
      type: AnomalyType.OUTLIER,
      timestamp,
      measurementId,
      rangeRuleId
    };
  }

  static createIntrusion(
    id: DomainEventId,
    timestamp: Date,
    detectionId: DomainEventId,
    intrusionRuleId: string
  ): Intrusion {
    return {
      id,
      type: AnomalyType.INTRUSION,
      timestamp,
      detectionId,
      intrusionRuleId
    };
  }

}
