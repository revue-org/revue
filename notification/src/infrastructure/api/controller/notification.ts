import { Notification } from '@/domain/core/Notification'
import { NotificationFactory } from '@/domain/factories/NotificationFactory.js'
import { notificationService } from '@/index.js'

export const notificationController = {
  getNotifications: async (): Promise<Notification[]> => {
    return await notificationService.getNotifications()
  },
  getNotificationById: async (id: string): Promise<Notification> => {
    return await notificationService.getNotificationById(NotificationFactory.idOf(id))
  },
  getNotificationsByType: async (type: string): Promise<Notification[]> => {
    return await notificationService.getNotificationsByType(
      type === 'outlier' ? { type: 'outlier' } : { type: 'intrusion' }
    )
  },
  deleteNotification: async (id: string): Promise<void> => {
    return notificationService.deleteNotification(NotificationFactory.idOf(id))
  }
}
