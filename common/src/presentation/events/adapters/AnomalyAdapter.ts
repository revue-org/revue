import { Anomaly, Intrusion, Outlier } from '../../../domain/core'
import { AnomalyFactory } from '../../../domain/factories/AnomalyFactory.js'
import { AnomalyMessage, anomalySchema } from '../schemas/AnomalySchema.js'

export class AnomaliesAdapter {
  static asDomainEvent(anomalyObj: object): Anomaly {
    const anomalyMessage: AnomalyMessage = anomalySchema.parse(anomalyObj)
    if (anomalyMessage.type === 'intrusion') {
      return AnomalyFactory.createIntrusion(
        anomalyMessage.timestamp,
        AnomalyFactory.idOf(anomalyMessage.data.detectionId!),
        anomalyMessage.data.intrusionRuleId!
      )
    } else if (anomalyMessage.type === 'outlier') {
      return AnomalyFactory.createOutlier(
        anomalyMessage.timestamp,
        AnomalyFactory.idOf(anomalyMessage.data.measurementId!),
        anomalyMessage.data.rangeRuleId!
      )
    } else {
      throw new Error('Anomaly type not supported')
    }
  }

  static asMessage(anomaly: Anomaly): AnomalyMessage {
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
