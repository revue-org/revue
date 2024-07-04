import { DomainEventId } from '../core/DomainEventId.js'
import { Outlier } from '../core/Outlier.js'
import { Intrusion } from '../core/Intrusion.js'
import { Detection, DomainEvent, Measurement } from '../core'

export class AnomalyFactory {
  static newId(): DomainEventId {
    return {
      value: 'test'
    }
  }

  static idOf(value: string): DomainEventId {
    return { value }
  }

  static createOutlier(timestamp: Date, measurement: Measurement, rangeRuleId: string): Outlier {
    return this.outlierFrom(this.newId(), timestamp, measurement, rangeRuleId)
  }

  static outlierFrom(
    id: DomainEventId,
    timestamp: Date,
    measurement: Measurement,
    rangeRuleId: string
  ): Outlier {
    return {
      id,
      type: 'outlier',
      timestamp,
      measurement,
      rangeRuleId
    }
  }

  static createIntrusion(timestamp: Date, detection: Detection, intrusionRuleId: string): Intrusion {
    return this.intrusionFrom(this.newId(), timestamp, detection, intrusionRuleId)
  }

  static intrusionFrom(
    id: DomainEventId,
    timestamp: Date,
    detection: Detection,
    intrusionRuleId: string
  ): Intrusion {
    return {
      id,
      type: 'intrusion',
      timestamp,
      detection,
      intrusionRuleId
    }
  }
}
