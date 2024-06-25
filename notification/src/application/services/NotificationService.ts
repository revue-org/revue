import { NotificationId } from '@/domain/core/NotificationId'
import { Notification } from '@/domain/core/Notification'
import { DomainEvent } from '@common/domain/core/DomainEvent'

export interface NotificationService {
  getNotifications(): Promise<Notification[]>

  getNotificationById(id: NotificationId): Promise<Notification>

  getNotificationsByType(type: any): Promise<Notification[]>

  createNotification(event: DomainEvent, message: string): Promise<NotificationId>

  deleteNotification(id: NotificationId): Promise<void>
}
