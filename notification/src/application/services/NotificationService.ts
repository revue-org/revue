import { NotificationId } from "@/domain/core/NotificationId";
import { Notification } from "@/domain/core/Notification";
import { Contact } from "@common/domain/core/Contact"

export interface NotificationService {

  getNotifications(): Promise<Notification[]>

  getNotificationById(id: NotificationId): Promise<Notification>

  createNotification(notification: Notification): Promise<void>

  sendMailNotification(notification: Notification, contacts: Contact[]): void

  deleteNotification(id: NotificationId): void
}
