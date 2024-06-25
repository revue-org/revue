import { Notification } from '@/domain/core/Notification'
import { MongoDBNotificationRepository } from '@/infrastructure/storage/MongoDBNotificationRepository.js'
import { NotificationService } from '@/application/services/NotificationService'
import { NotificationServiceImpl } from '@/application/services/NotificationServiceImpl.js'
import { NotificationFactory } from '@/domain/factories/NotificationFactory.js'
import { NotificationEventsHub } from '@/application/services/NotificationEventsHub'

const service: NotificationService = new NotificationServiceImpl(
  new MongoDBNotificationRepository(),
  {} as NotificationEventsHub
)
export const notificationController = {
  getNotifications: async (): Promise<Notification[]> => {
    return await service.getNotifications()
  },
  getNotificationById: async (id: string): Promise<Notification> => {
    return await service.getNotificationById(NotificationFactory.idOf(id))
  },
  getNotificationsByType: async (type: string): Promise<Notification[]> => {
    return await service.getNotificationsByType(
      type === 'outlier' ? { type: 'outlier' } : { type: 'intrusion' }
    )
  },
  deleteNotification: async (id: string): Promise<void> => {
    return service.deleteNotification(NotificationFactory.idOf(id))
  }
}
