import { Anomaly } from '@common/domain/core'
import { Notification } from '@/domain/core/Notification'

export interface NotificationEventsHub {
  subscribeToAnomalies(handler: (anomaly: Anomaly) => void): void

  publishNotification(notification: Notification): void
}
