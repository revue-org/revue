import { DomainEventId } from '../core/DomainEventId'
import { Outlier } from '../core/Outlier'
import { Intrusion } from '../core/Intrusion'

export class AnomalyFactory {
  static newId(): DomainEventId {
    return {
      value: 'test'
    }
  }

  static idOf(value: string): DomainEventId {
    return { value }
  }

  static createOutlier(timestamp: Date, measurementId: DomainEventId, rangeRuleId: string): Outlier {
    return {
      id: this.newId(),
      type: 'outlier',
      timestamp,
      measurementId,
      rangeRuleId
    }
  }

  static createIntrusion(timestamp: Date, detectionId: DomainEventId, intrusionRuleId: string): Intrusion {
    return {
      id: this.newId(),
      type: 'intrusion',
      timestamp,
      detectionId,
      intrusionRuleId
    }
  }
}
