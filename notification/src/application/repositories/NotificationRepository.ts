import { Notification } from '@/domain/core/Notification'
import { NotificationId } from '@/domain/core/NotificationId'

export interface NotificationRepository {
  getNotifications(): Promise<Notification[]>

  getNotificationById(notificationId: NotificationId): Promise<Notification>

  getNotificationsByType(type: string): Promise<Notification[]>

  saveNotification(notification: Notification): Promise<void>

  removeNotification(notificationId: NotificationId): Promise<void>
}
