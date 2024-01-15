import { Notification } from '../core/Notification.js'

export interface NotificationRepository {
  getNotifications(): Promise<Notification[]>

  getNotificationById(notificationId: string): Promise<Notification>

  insertExceedingNotification(notification: Notification): Promise<void>

  insertIntrusionNotification(notification: Notification): Promise<void>

  updateExceedingNotification(notification: Notification): Promise<void>

  updateIntrusionNotification(notification: Notification): Promise<void>

  deleteNotification(notificationId: string): Promise<void>
}
