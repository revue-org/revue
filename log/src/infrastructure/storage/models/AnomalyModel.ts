import { Anomaly, Detection, Intrusion, Measurement, Outlier } from '@common/domain/core'
import { AnomalyFactory } from '@common/domain/factories/AnomalyFactory.js'
import { MeasurementFactory } from '@common/domain/factories/MeasurementFactory.js'
import { DetectionFactory } from '@common/domain/factories/DetectionFactory.js'
import { MeasureFactory } from '@common/domain/factories/MeasureFactory.js'
import { MeasureType } from '@common/domain/core/MeasureType.js'
import { ObjectClass } from '@common/domain/core/ObjectClass.js'
import { MeasureUnit } from '@common/domain/core/MeasureUnit.js'

export interface AnomalyDBEntity {
  id: string
  type: string
  timestamp: Date
  data: {
    type: string
    sourceDeviceId: string
    timestamp: Date
    measurementId?: string
    measure?: {
      type: string
      unit: string
    }
    value?: number
    detectionId?: string
    objectClass?: string
    rangeRuleId?: string
    intrusionRuleId?: string
  }
}

export class AnomalyDBAdapter {
  static asDomainEntity(anomaly: AnomalyDBEntity): Anomaly {
    if (anomaly.type == 'outlier') {
      return AnomalyFactory.outlierFrom(
        AnomalyFactory.idOf(anomaly.id),
        anomaly.timestamp,
        MeasurementFactory.numericMeasurementFrom(
          MeasurementFactory.idOf(anomaly.data.measurementId!),
          anomaly.data.timestamp,
          anomaly.data.sourceDeviceId,
          MeasureFactory.createMeasure(
            MeasureType[anomaly.data.measure!.type as keyof typeof MeasureType],
            MeasureUnit[anomaly.data.measure!.unit as keyof typeof MeasureUnit]
          ),
          anomaly.data.value!
        ),
        anomaly.data.rangeRuleId!
      )
    } else {
      return AnomalyFactory.intrusionFrom(
        AnomalyFactory.idOf(anomaly.id),
        anomaly.timestamp,
        DetectionFactory.detectionFrom(
          DetectionFactory.idOf(anomaly.data.detectionId!),
          anomaly.data.timestamp,
          anomaly.data.sourceDeviceId,
          ObjectClass[anomaly.data.objectClass! as keyof typeof ObjectClass]
        ),
        anomaly.data.intrusionRuleId!
      )
    }
  }

  static asDBEntity(anomaly: Anomaly): AnomalyDBEntity {
    if (anomaly.type == 'outlier') {
      const outlier: Outlier = anomaly as Outlier
      const measurement: Measurement = outlier.measurement as Measurement
      return {
        id: outlier.id.value,
        type: 'outlier',
        timestamp: outlier.timestamp,
        data: {
          type: 'measurement',
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
          type: 'detection',
          sourceDeviceId: detection.sourceDeviceId,
          timestamp: detection.timestamp,
          detectionId: detection.id.value,
          objectClass: detection.objectClass,
          intrusionRuleId: intrusion.intrusionRuleId
        }
      }
    }
  }
}
