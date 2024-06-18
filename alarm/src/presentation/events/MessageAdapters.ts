import { Anomaly, AnomalyType, Detection, Intrusion, Measurement, Outlier } from '@common/domain/core'
import {
  AnomalyMessage,
  anomalySchema,
  detectionSchema,
  measurementSchema
} from '@/presentation/events/schemas/MessageSchemas'

export class AnomaliesAdapter {
  static asDomainEvent(anomalyObj: object): Anomaly {
    const anomalyMessage: AnomalyMessage = anomalySchema.parse(anomalyObj)
    if (anomalyMessage.type === AnomalyType.INTRUSION) {
      return {
        ...anomalyMessage,
        detectionId: anomalyMessage.data.detectionId,
        intrusionRuleId: anomalyMessage.data.intrusionRuleId
      } as Intrusion
    } else if (anomalyMessage.type === AnomalyType.OUTLIER) {
      return {
        ...anomalyMessage,
        measurementId: anomalyMessage.data.measurementId,
        rangeRuleId: anomalyMessage.data.rangeRuleId
      } as Outlier
    } else {
      return anomalyMessage
    }
  }

  static asMessage(anomaly: Anomaly): AnomalyMessage {
    return {
      ...anomaly,
      data: {
        detectionId: (anomaly as Intrusion).detectionId,
        intrusionRuleId: (anomaly as Intrusion).intrusionRuleId,
        measurementId: (anomaly as Outlier).measurementId,
        rangeRuleId: (anomaly as Outlier).rangeRuleId
      }
    } as AnomalyMessage
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
