import { Notification } from '@/domain/core/Notification'
import { MongoDBNotificationRepository } from '@/infrastructure/storage/MongoDBNotificationRepository'
import { NotificationService } from '@/application/services/NotificationService'
import { NotificationServiceImpl } from '@/application/services/NotificationServiceImpl'
import { NotificationFactory } from '@/domain/factories/NotificationFactory'
import { NotificationId } from '@/domain/core/NotificationId'
import { DomainEventType } from 'common/dist/domain/core/DomainEventType'
import { DomainEvent } from 'common/dist/domain/core/DomainEvent'
import { io } from '@/index'

const service: NotificationService = new NotificationServiceImpl(new MongoDBNotificationRepository())
export const notificationController = {
  getNotificationById: async (id: string): Promise<Notification> => {
    return await service.getNotificationById(NotificationFactory.idOf(id))
  },
  getNotifications: async (): Promise<Notification[]> => {
    return await service.getNotifications()
  },
  createExceedingNotification: async (
    id: NotificationId,
    type: DomainEventType,
    event: DomainEvent,
    message: string
  ): Promise<void> => {
    await service.createNotification(id, type, event, message)
    //TODO: NOTIFY THE USER
    //service.sendMail(notification, contacts)
    io.emit('notification', { type: 'EXCEEDING' })
  },
  createIntrusionNotification: async (
    id: NotificationId,
    type: DomainEventType,
    event: DomainEvent,
    message: string
  ): Promise<void> => {
    await service.createNotification(id, type, event, message)
    //service.sendMail(notification, contacts)
    io.emit('notification', { type: 'INTRUSION' })
  },
  deleteNotification: async (id: NotificationId): Promise<void> => {
    return service.deleteNotification(id)
  }
}
