import { Notification } from '../../domain/notification/core/Notification.js'
import { Contact } from "../../domain/monitoring/core/Contact.js";

export interface NotificationService {
  getNotificationById(id: string): Promise<Notification>

  getNotifications(): Promise<Notification[]>

  insertExceedingNotification(notification: Notification): Promise<string>

  insertIntrusionNotification(notification: Notification): Promise<string>

  sendMailNotification(notification: Notification, contacts: Contact[]): void

  updateExceedingNotification(notification: Notification): void

  updateIntrusionNotification(notification: Notification): void

  deleteNotification(id: string): void
}
