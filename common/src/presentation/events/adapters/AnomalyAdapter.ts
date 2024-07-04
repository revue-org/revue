import { Anomaly } from '../../../domain/core/Anomaly.js'
import { Intrusion } from '../../../domain/core/Intrusion.js'
import { Outlier } from '../../../domain/core/Outlier.js'
import { Detection } from '../../../domain/core/Detection.js'
import { MeasureType } from '../../../domain/core/MeasureType.js'
import { MeasureUnit } from '../../../domain/core/MeasureUnit.js'
import { ObjectClass } from '../../../domain/core/ObjectClass.js'
import { AnomalyFactory } from '../../../domain/factories/AnomalyFactory.js'
import { DetectionFactory } from '../../../domain/factories/DetectionFactory.js'
import { MeasurementFactory } from '../../../domain/factories/MeasurementFactory.js'
import { MeasureFactory } from '../../../domain/factories/MeasureFactory.js'
import { AnomalySchema, anomalySchema } from '../../schemas/AnomalySchema.js'
import { NumericMeasurement } from '../../../domain/core/NumericMeasurement.js'

export class AnomaliesAdapter {
  static asDomainEvent(anomalyObj: object): Anomaly {
    const anomalyMessage: AnomalySchema = anomalySchema.parse(anomalyObj)
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

  static asMessage(anomaly: Anomaly): AnomalySchema {
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
