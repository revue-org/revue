import { Notification } from '../core/Notification'

export interface NotificationRepository {
  getNotifications(): Promise<Array<Notification>>

  getNotification(notificationId: number): Promise<Notification>

  insertNotification(notification: Notification): Promise<void>

  updateNotification(notification: Notification): Promise<void>

  deleteNotification(notificationId: number): Promise<void>
}
