import { AnomalyType, DomainEventId, Intrusion, Outlier } from '../core'

export class AnomalyFactory {
  static newId(): DomainEventId {
    return {
      value: 'test'
    }
  }

  static idOf(value: string): DomainEventId {
    return { value }
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
    }
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
    }
  }
}
