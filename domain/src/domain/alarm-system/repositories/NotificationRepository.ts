import { Notification } from '../core/Notification'

export interface NotificationRepository {
  getNotifications(): Promise<Notification[]>

  getNotification(notificationId: string): Promise<Notification>

  insertNotification(notification: Notification): Promise<void>

  updateNotification(notification: Notification): Promise<void>

  deleteNotification(notificationId: string): Promise<void>
}
