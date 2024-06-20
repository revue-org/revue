import mongoose from 'mongoose'
import { notificationSchema } from './schemas/NotificationSchema'
import { NotificationId } from '@/domain/core/NotificationId'
import { Notification } from '@/domain/core/Notification'
import { NotificationRepository } from '@/application/repositories/NotificationRepository'
import {
  NotificationDBAdapter,
  NotificationDBEntity
} from '@/infrastructure/storage/models/NotificationModel'

export class MongoDBNotificationRepository implements NotificationRepository {
  private _model = mongoose.model<NotificationDBEntity>(
    'NotificationSchema',
    notificationSchema,
    'notification'
  )

  async getNotifications(): Promise<Notification[]> {
    return this._model
      .find()
      .lean()
      .then(notifications => {
        return notifications.map(notification => NotificationDBAdapter.asDomainEntity(notification))
      })
  }

  async getNotificationById(notificationId: NotificationId): Promise<Notification> {
    const notification = await this._model
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
    const notifications = await this._model
      .find({
        type: type
      })
      .lean()
    return notifications.map(notification => NotificationDBAdapter.asDomainEntity(notification))
  }

  async saveNotification(notification: Notification): Promise<void> {
    await this._model.create(NotificationDBAdapter.asDBEntity(notification))
  }

  async removeNotification(notificationId: NotificationId): Promise<void> {
    await this._model.deleteOne({ id: notificationId.value })
  }
}
