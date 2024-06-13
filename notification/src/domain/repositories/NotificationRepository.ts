import { Notification } from '../core/Notification.js'
import { NotificationId } from '@/domain/core/NotificationId'

export interface NotificationRepository {
  getNotifications(): Promise<Notification[]>

  getNotificationById(notificationId: NotificationId): Promise<Notification>

  saveNotification(notification: Notification): Promise<NotificationId>

  removeNotification(notificationId: NotificationId): Promise<void>
}
