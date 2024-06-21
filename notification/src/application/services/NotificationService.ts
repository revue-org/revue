import { NotificationId } from '@/domain/core/NotificationId'
import { Notification } from '@/domain/core/Notification'
import { DomainEventType } from 'common/dist/domain/core/DomainEventType'
import { DomainEvent } from 'common/dist/domain/core/DomainEvent'

export interface NotificationService {
  getNotifications(): Promise<Notification[]>

  getNotificationById(id: NotificationId): Promise<Notification>

  getNotificationsByType(type: DomainEventType): Promise<Notification[]>

  createNotification(event: DomainEvent, message: string): Promise<void>

  deleteNotification(id: NotificationId): Promise<void>
}
