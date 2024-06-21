import { Anomaly, Intrusion, Outlier } from '@common/domain/core'
import { AnomalyFactory, MeasurementFactory } from '@common/domain/factories'

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
    if (anomaly.type == 'outlier') {
      return AnomalyFactory.outlierFrom(
        AnomalyFactory.idOf(anomaly.id),
        anomaly.timestamp,
        MeasurementFactory.idOf(anomaly.data.measurementId!),
        anomaly.data.rangeRuleId!
      )
    } else {
      return AnomalyFactory.intrusionFrom(
        AnomalyFactory.idOf(anomaly.id),
        anomaly.timestamp,
        MeasurementFactory.idOf(anomaly.data.detectionId!),
        anomaly.data.intrusionRuleId!
      )
    }
  }

  static asDBEntity(anomaly: Anomaly): AnomalyDBEntity {
    if (anomaly.type == 'outlier') {
      const outlier: Outlier = anomaly as Outlier
      return {
        id: outlier.id.value,
        type: 'outlier',
        timestamp: outlier.timestamp,
        data: {
          measurementId: outlier.measurementId.value,
          rangeRuleId: outlier.rangeRuleId
        }
      }
    } else {
      const intrusion: Intrusion = anomaly as Intrusion
      return {
        id: intrusion.id.value,
        type: 'intrusion',
        timestamp: intrusion.timestamp,
        data: {
          detectionId: intrusion.detectionId.value,
          intrusionRuleId: intrusion.intrusionRuleId
        }
      }
    }
  }
}
