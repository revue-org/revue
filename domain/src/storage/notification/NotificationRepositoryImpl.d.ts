import { NotificationRepository } from '../../domain/notification/repositories/NotificationRepository'
import { Model } from 'mongoose'
import { Notification } from '../../domain/notification/core/Notification.js'
export declare class NotificationRepositoryImpl implements NotificationRepository {
  notificationModel: Model<Notification>
  constructor(notificationModel: Model<Notification>)
  getNotifications(): Promise<Notification[]>
  getNotificationById(notificationId: string): Promise<Notification>
  insertExceedingNotification(notification: Notification): Promise<string>
  insertIntrusionNotification(notification: Notification): Promise<string>
  updateExceedingNotification(notification: Notification): Promise<void>
  updateIntrusionNotification(notification: Notification): Promise<void>
  deleteNotification(notificationId: string): Promise<void>
}
