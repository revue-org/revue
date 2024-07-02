import {
  Anomaly,
  Detection,
  Intrusion,
  MeasureType,
  MeasureUnit,
  NumericMeasurement,
  ObjectClass,
  Outlier
} from '../../../domain/core'
import {
  AnomalyFactory,
  DetectionFactory,
  MeasureFactory,
  MeasurementFactory
} from '../../../domain/factories'
import { AnomalyMessage, anomalySchema } from '../schemas/AnomalySchema.js'

export class AnomaliesAdapter {
  static asDomainEvent(anomalyObj: object): Anomaly {
    const anomalyMessage: AnomalyMessage = anomalySchema.parse(anomalyObj)
    if (anomalyMessage.type === 'intrusion') {
      return AnomalyFactory.createIntrusion(
        anomalyMessage.timestamp,
        DetectionFactory.detectionFrom(
          DetectionFactory.idOf(anomalyMessage.data.detectionId!),
          anomalyMessage.data.timestamp,
          anomalyMessage.data.sourceDeviceId,
          ObjectClass[anomalyMessage.data.objectClass! as keyof typeof ObjectClass]
        ),
        anomalyMessage.data.intrusionRuleId!
      )
    } else if (anomalyMessage.type === 'outlier') {
      return AnomalyFactory.createOutlier(
        anomalyMessage.timestamp,
        MeasurementFactory.numericMeasurementFrom(
          MeasurementFactory.idOf(anomalyMessage.data.measurementId!),
          anomalyMessage.data.timestamp,
          anomalyMessage.data.sourceDeviceId,
          MeasureFactory.createMeasure(
            MeasureType[anomalyMessage.data.measure!.type as keyof typeof MeasureType],
            MeasureUnit[anomalyMessage.data.measure!.unit as keyof typeof MeasureUnit]
          ),
          anomalyMessage.data.value!
        ),
        anomalyMessage.data.rangeRuleId!
      )
    } else {
      throw new Error('Anomaly type not supported')
    }
  }

  static asMessage(anomaly: Anomaly): AnomalyMessage {
    if (anomaly.type == 'outlier') {
      const outlier: Outlier = anomaly as Outlier
      const measurement: NumericMeasurement = outlier.measurement as NumericMeasurement
      return {
        id: outlier.id.value,
        type: 'outlier',
        timestamp: outlier.timestamp,
        data: {
          type: measurement.type,
          sourceDeviceId: measurement.sourceDeviceId,
          timestamp: measurement.timestamp,
          measurementId: measurement.id.value,
          measure: {
            type: measurement.measure.type,
            unit: measurement.measure.unit
          },
          value: measurement.value,
          rangeRuleId: outlier.rangeRuleId
        }
      }
    } else {
      const intrusion: Intrusion = anomaly as Intrusion
      const detection: Detection = intrusion.detection as Detection
      return {
        id: intrusion.id.value,
        type: 'intrusion',
        timestamp: intrusion.timestamp,
        data: {
          detectionId: detection.id.value,
          type: detection.type,
          sourceDeviceId: detection.sourceDeviceId,
          timestamp: detection.timestamp,
          objectClass: detection.objectClass,
          intrusionRuleId: intrusion.intrusionRuleId
        }
      }
    }
  }
}
