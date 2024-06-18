import { anomalySchema, detectionSchema, measurementSchema } from './schemas/MessageSchemas.js'
import {AnomalyMessage } from './schemas/MessageSchemas.js'
import { Anomaly, Detection, Intrusion, Measurement, Outlier } from '../../domain/core'
import { AnomalyType } from '../../domain/core'
import { AnomalyFactory } from '../../domain/factories'


export class AnomaliesAdapter {
  static asDomainEvent(anomalyObj: object): Anomaly {
    const anomalyMessage: AnomalyMessage = anomalySchema.parse(anomalyObj)
    if (anomalyMessage.type === AnomalyType.INTRUSION) {
      return AnomalyFactory.createIntrusion(
        AnomalyFactory.idOf(anomalyMessage.id),
        anomalyMessage.timestamp,
        AnomalyFactory.idOf(anomalyMessage.data.detectionId!),
        anomalyMessage.data.intrusionRuleId!
      )
    } else if (anomalyMessage.type === AnomalyType.OUTLIER) {
      return AnomalyFactory.createOutlier(
        AnomalyFactory.idOf(anomalyMessage.id),
        anomalyMessage.timestamp,
        AnomalyFactory.idOf(anomalyMessage.data.measurementId!),
        anomalyMessage.data.rangeRuleId!
      )
    } else {
      throw new Error('Anomaly type not supported')
    }
  }

  static asMessage(anomaly: Anomaly): AnomalyMessage {
    if (anomaly.type == AnomalyType.OUTLIER) {
      const outlier: Outlier = anomaly as Outlier
      return {
        id: outlier.id.value,
        type: AnomalyType.OUTLIER,
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
        type: AnomalyType.INTRUSION,
        timestamp: intrusion.timestamp,
        data: {
          detectionId: intrusion.detectionId.value,
          intrusionRuleId: intrusion.intrusionRuleId
        }
      }
    }
  }

}

export class DetectionsAdapter {
  static asDomainEvent(detectionObj: object): Detection {
    return detectionSchema.parse(detectionObj)
  }

  static asMessage(detection: Detection): object {
    return { ...detection }
  }
}

export class MeasurementsAdapter {
  static asDomainEvent(measurementObj: object): Measurement {
    return measurementSchema.parse(measurementObj)
  }

  static asMessage(measurement: Measurement): object {
    return { ...measurement }
  }
}
