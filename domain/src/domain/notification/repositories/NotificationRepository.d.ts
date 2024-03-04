import { Notification } from '../core/Notification.js';
export interface NotificationRepository {
    getNotifications(): Promise<Notification[]>;
    getNotificationById(notificationId: string): Promise<Notification>;
    insertExceedingNotification(notification: Notification): Promise<string>;
    insertIntrusionNotification(notification: Notification): Promise<string>;
    updateExceedingNotification(notification: Notification): Promise<void>;
    updateIntrusionNotification(notification: Notification): Promise<void>;
    deleteNotification(notificationId: string): Promise<void>;
}
