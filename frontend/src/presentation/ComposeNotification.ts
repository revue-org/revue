import { type Notification } from '@/domain/core/Notification.js'

export const composeNotification = (notification: any): Notification => {
  if (notification.event.type === 'outlier') {
    return {
      id: notification.id.value,
      event: {
        type: notification.event.type,
        timestamp: new Date(notification.event.timestamp),
        sourceDeviceId: notification.event.sourceDeviceId,
        measurementId: notification.event.measurementId,
        measure: {
          type: notification.event.measurement.measure.type,
          unit: notification.event.measurement.measure.unit
        },
        value: notification.event.value
      },
      message: notification.message
    }
  } else {
    return {
      id: notification.id.value,
      event: {
        type: notification.event.type,
        timestamp: new Date(notification.event.timestamp),
        sourceDeviceId: notification.event.sourceDeviceId,
        detectionId: notification.event.detectionId,
        objectClass: notification.event.objectClass,
        intrusionRuleId: notification.event.intrusionRuleId
      },
      message: notification.message
    }
  }
}
