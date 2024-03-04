import { Notification } from "../../domain/notification/core/Notification";

export interface NotificationService {
  getNotificationById(id: string): Promise<Notification>

  getNotifications(): Promise<Notification[]>

  insertExceedingNotification(notification: Notification): Promise<string>

  insertIntrusionNotification(notification: Notification): Promise<string>

  updateExceedingNotification(notification: Notification): void

  updateIntrusionNotification(notification: Notification): void

  deleteNotification(id: string): void
}