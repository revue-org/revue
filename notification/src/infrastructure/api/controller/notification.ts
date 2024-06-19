import { Notification } from '@/domain/core/Notification'
import { MongoDBNotificationRepository } from '@/infrastructure/storage/MongoDBNotificationRepository'
import { NotificationService } from '@/application/services/NotificationService'
import { NotificationServiceImpl } from '@/application/services/NotificationServiceImpl'
import { NotificationFactory } from '@/domain/factories/NotificationFactory'
import { DomainEventType } from 'common/dist/domain/core'

const service: NotificationService = new NotificationServiceImpl(new MongoDBNotificationRepository())
export const notificationController = {
  getNotifications: async (): Promise<Notification[]> => {
    return await service.getNotifications()
  },
  getNotificationById: async (id: string): Promise<Notification> => {
    return await service.getNotificationById(NotificationFactory.idOf(id))
  },
  getNotificationsByType: async (type: string): Promise<Notification[]> => {
    return await service.getNotificationsByType(
      type === 'outlier' ? DomainEventType.OUTLIER : DomainEventType.INTRUSION
    )
  },
  deleteNotification: async (id: string): Promise<void> => {
    return service.deleteNotification(NotificationFactory.idOf(id))
  }
}
