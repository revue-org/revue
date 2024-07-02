import { Notification } from '@/domain/core/Notification'
import { NotificationFactory } from '@/domain/factories/NotificationFactory.js'
import { AnomalyFactory } from '@common/domain/factories/AnomalyFactory.js'
import { Outlier } from '@common/domain/core/Outlier'
import { Intrusion } from '@common/domain/core/Intrusion'
import { DetectionFactory, MeasureFactory, MeasurementFactory } from 'common/dist/domain/factories'
import { Detection, Measurement, MeasureType, MeasureUnit, ObjectClass } from 'common/dist/domain/core'

export interface NotificationDBEntity {
  id: string
  type: string
  timestamp: Date
  event: {
    type: string
    timestamp: Date
    sourceDeviceId: string
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
  message: string
}

export class NotificationDBAdapter {
  static asDomainEntity(notification: NotificationDBEntity): Notification {
    if (notification.type === 'outlier') {
      return NotificationFactory.notificationFrom(
        NotificationFactory.idOf(notification.id),
        AnomalyFactory.createOutlier(
          notification.timestamp,
          MeasurementFactory.numericMeasurementFrom(
            MeasurementFactory.idOf(notification.event.measurementId!),
            notification.event.timestamp,
            notification.event.sourceDeviceId,
            MeasureFactory.createMeasure(
              MeasureType[notification.event.measure!.type as keyof typeof MeasureType],
              MeasureUnit[notification.event.measure!.unit as keyof typeof MeasureUnit]
            ),
            notification.event.value!
          ),
          notification.event.rangeRuleId!
        ),
        notification.message
      )
    } else {
      return NotificationFactory.notificationFrom(
        NotificationFactory.idOf(notification.id),
        AnomalyFactory.createIntrusion(
          notification.timestamp,
          DetectionFactory.detectionFrom(
            DetectionFactory.idOf(notification.event.detectionId!),
            notification.event.timestamp,
            notification.event.sourceDeviceId,
            ObjectClass[notification.event.objectClass! as keyof typeof ObjectClass]
          ),
          notification.event.intrusionRuleId!
        ),
        notification.message
      )
    }
  }

  static asDBEntity(notification: Notification): NotificationDBEntity {
    if (notification.event.type === 'outlier') {
      const outlier: Outlier = notification.event as Outlier
      const measurement: Measurement = outlier.measurement as Measurement
      return {
        id: notification.id.value,
        type: notification.event.type,
        timestamp: notification.event.timestamp,
        event: {
          type: 'measurement',
          timestamp: measurement.timestamp,
          sourceDeviceId: measurement.sourceDeviceId,
          measurementId: measurement.id.value,
          measure: {
            type: measurement.measure.type,
            unit: measurement.measure.unit
          },
          value: measurement.value,
          rangeRuleId: outlier.rangeRuleId
        },
        message: notification.message
      }
    } else {
      const intrusion: Intrusion = notification.event as Intrusion
      const detection: Detection = intrusion.detection as Detection
      return {
        id: notification.id.value,
        type: notification.event.type,
        timestamp: notification.event.timestamp,
        event: {
          type: 'detection',
          sourceDeviceId: detection.sourceDeviceId,
          timestamp: detection.timestamp,
          detectionId: detection.id.value,
          objectClass: detection.objectClass,
          intrusionRuleId: intrusion.intrusionRuleId
        },
        message: notification.message
      }
    }
  }
}
