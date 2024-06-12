import { Anomaly } from '@common/domain/core/Anomaly'
import { AnomalyFactory } from '@common/domain/factories/AnomalyFactory.js'
import { Outlier } from '@common/domain/core/Outlier'
import { Intrusion } from '@common/domain/core/Intrusion'
import { AnomalyType } from 'common/dist/domain/core/AnomalyType'
import { MeasurementFactory } from '@common/domain/factories/MeasurementFactory.js'

export interface AnomalyDBEntity {
  id: string
  type: string
  timestamp: Date
  data: {
    measurementId?: string
    detectionId?: string
    intrusionRuleId?: string
    rangeRuleId?: string
  }
}

export class AnomalyDBAdapter {
  static asDomainEntity(anomaly: AnomalyDBEntity): Anomaly {
    if (anomaly.type == AnomalyType.OUTLIER) {
      return AnomalyFactory.createOutlier(
        AnomalyFactory.idOf(anomaly.id),
        anomaly.timestamp,
        MeasurementFactory.idOf(anomaly.data.measurementId!),
        anomaly.data.rangeRuleId!
      )
    } else {
      return AnomalyFactory.createIntrusion(
        AnomalyFactory.idOf(anomaly.id),
        anomaly.timestamp,
        MeasurementFactory.idOf(anomaly.data.detectionId!),
        anomaly.data.intrusionRuleId!
      )
    }
  }

  static asDBEntity(anomaly: Anomaly): AnomalyDBEntity {
    if (anomaly.type == AnomalyType.OUTLIER) {
      const outlier: Outlier = anomaly as Outlier
      return {
        id: outlier.id.id,
        type: AnomalyType.OUTLIER,
        timestamp: outlier.timestamp,
        data: {
          measurementId: outlier.measurementId.id,
          rangeRuleId: outlier.rangeRuleId
        }
      }
    } else {
      const intrusion: Intrusion = anomaly as Intrusion
      return {
        id: intrusion.id.id,
        type: AnomalyType.INTRUSION,
        timestamp: intrusion.timestamp,
        data: {
          detectionId: intrusion.detectionId.id,
          intrusionRuleId: intrusion.intrusionRuleId
        }
      }
    }
  }
}
