import { NotificationEventsHub } from '@/application/services/NotificationEventsHub'
import { Anomaly } from 'common/dist/domain/core'
import { SocketNotificationEventsHub } from '@/infrastructure/events/socket/SocketNotificationEventsHub.js'
import { KafkaNotificationEventsHub } from '@/infrastructure/events/kafka/KafkaNotificationEventsHub.js'
import { Notification } from '@/domain/core/Notification'

export class NotificationEventsHubImpl implements NotificationEventsHub {
  private readonly kafkaEvents: KafkaNotificationEventsHub
  private readonly socketEvents: SocketNotificationEventsHub

  constructor(
    kafkaNotification: KafkaNotificationEventsHub,
    socketNotification: SocketNotificationEventsHub
  ) {
    this.kafkaEvents = kafkaNotification
    this.socketEvents = socketNotification
  }

  async subscribeToAnomalies(handler: (_anomaly: Anomaly) => void): Promise<void> {
    this.kafkaEvents.subscribeToAnomalies(handler)
  }

  publishNotification(notification: Notification): void {
    this.socketEvents.publishNotification(notification)
    this.kafkaEvents.publishNotification(notification)
  }
}
