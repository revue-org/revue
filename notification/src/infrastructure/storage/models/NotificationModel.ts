import { Notification } from '@/domain/core/Notification'
import { NotificationFactory } from '@/domain/factories/NotificationFactory'
import { DomainEventType } from 'common/dist/domain/core/DomainEventType'
import { AnomalyFactory } from 'common/dist/domain/factories/AnomalyFactory'
import { Outlier } from 'common/dist/domain/core/Outlier'
import { Intrusion } from 'common/dist/domain/core/Intrusion'

export interface NotificationDBEntity {
  id: string
  type: string
  timestamp: Date
  event: {
    id: string
    intrusionRuleId?: string
    rangeRuleId?: string
    detectionId?: string
    measurementId?: string
  }
  message: string
}

export class NotificationDBAdapter {
  static asDomainEntity(notification: NotificationDBEntity): Notification {
    if (notification.type === DomainEventType.OUTLIER) {
      return NotificationFactory.createNotification(
        NotificationFactory.idOf(notification.id),
        DomainEventType.OUTLIER,
        AnomalyFactory.createOutlier(
          AnomalyFactory.idOf(notification.event.id),
          notification.timestamp,
          AnomalyFactory.idOf(notification.event.measurementId!),
          notification.event.rangeRuleId!
        ),
        notification.message
      )
    } else {
      return NotificationFactory.createNotification(
        NotificationFactory.idOf(notification.id),
        DomainEventType.INTRUSION,
        AnomalyFactory.createIntrusion(
          AnomalyFactory.idOf(notification.event.id),
          notification.timestamp,
          AnomalyFactory.idOf(notification.event.detectionId!),
          notification.event.intrusionRuleId!
        ),
        notification.message
      )
    }
  }

  static asDBEntity(notification: Notification): NotificationDBEntity {
    if (notification.type === DomainEventType.OUTLIER) {
      const outlier: Outlier = notification.event as Outlier
      return {
        id: notification.id.value,
        type: notification.type,
        timestamp: notification.event.timestamp,
        event: {
          id: notification.event.id.value,
          rangeRuleId: outlier.rangeRuleId,
          measurementId: outlier.measurementId.value
        },
        message: notification.message
      }
    } else {
      const intrusion: Intrusion = notification.event as Intrusion
      return {
        id: notification.id.value,
        type: notification.type,
        timestamp: notification.event.timestamp,
        event: {
          id: notification.event.id.value,
          intrusionRuleId: intrusion.intrusionRuleId,
          detectionId: intrusion.detectionId.value
        },
        message: notification.message
      }
    }
  }
}
