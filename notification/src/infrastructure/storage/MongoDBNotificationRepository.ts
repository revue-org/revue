import mongoose from 'mongoose'
import { notificationSchema } from './schemas/NotificationSchema.js'
import { NotificationId } from '@/domain/core/NotificationId'
import { Notification } from '@/domain/core/Notification'
import { NotificationRepository } from '@/application/repositories/NotificationRepository'
import { NotificationDBAdapter } from '@/infrastructure/storage/models/NotificationModel.js'
import { NotificationDBEntity } from '@/infrastructure/storage/models/NotificationModel'

export class MongoDBNotificationRepository implements NotificationRepository {
  private model = mongoose.model<NotificationDBEntity>(
    'NotificationSchema',
    notificationSchema,
    'notification'
  )

  async getNotifications(): Promise<Notification[]> {
    return this.model
      .find()
      .lean()
      .then(notifications => {
        return notifications.map(notification => NotificationDBAdapter.asDomainEntity(notification))
      })
  }

  async getNotificationById(notificationId: NotificationId): Promise<Notification> {
    const notification = await this.model
      .findOne({
        id: notificationId.value
      })
      .lean()
    if (!notification) {
      throw new Error('Notification not found')
    }
    return NotificationDBAdapter.asDomainEntity(notification)
  }

  async getNotificationsByType(type: string): Promise<Notification[]> {
    const notifications = await this.model
      .find({
        type: type
      })
      .lean()
    return notifications.map(notification => NotificationDBAdapter.asDomainEntity(notification))
  }

  async saveNotification(notification: Notification): Promise<NotificationId> {
    await this.model.create(NotificationDBAdapter.asDBEntity(notification))
    return notification.id
  }

  async removeNotification(notificationId: NotificationId): Promise<void> {
    await this.model.deleteOne({ id: notificationId.value })
  }
}
