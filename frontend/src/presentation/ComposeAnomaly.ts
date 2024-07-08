import {
  AnomalyFactory,
  DetectionFactory,
  MeasureFactory,
  MeasurementFactory
} from 'common/dist/domain/factories'
import type { Intrusion } from 'common/dist/domain/core'

export const composeOutlier = (outlier: any): any => {
  return AnomalyFactory.outlierFrom(
    AnomalyFactory.idOf(outlier.id.value),
    new Date(outlier.timestamp),
    MeasurementFactory.numericMeasurementFrom(
      MeasurementFactory.idOf(outlier.measurement.id.value),
      new Date(outlier.measurement.timestamp),
      outlier.measurement.sourceDeviceId,
      MeasureFactory.createMeasure(outlier.measurement.measure.type, outlier.measurement.measure.unit),
      outlier.measurement.value
    ),
    outlier.rangeRuleId
  )
}

export const composeIntrusion = (intrusion: any): Intrusion => {
  return AnomalyFactory.intrusionFrom(
    AnomalyFactory.idOf(intrusion.id.value),
    new Date(intrusion.timestamp),
    DetectionFactory.detectionFrom(
      DetectionFactory.idOf(intrusion.detection.id.value),
      new Date(intrusion.detection.timestamp),
      intrusion.detection.sourceDeviceId,
      intrusion.detection.objectClass
    ),
    intrusion.intrusionRuleId
  )
}
