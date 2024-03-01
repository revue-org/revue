import { NotificationRepository } from '../../domain/notification/repositories/NotificationRepository'
import { Model } from 'mongoose'
import { Notification } from '../../domain/notification/core/Notification.js'

export class NotificationRepositoryImpl implements NotificationRepository {
  notificationModel: Model<Notification>

  constructor(notificationModel: Model<Notification>) {
    this.notificationModel = notificationModel
  }

  getNotifications(): Promise<Notification[]> {
    return this.notificationModel.find().orFail()
  }

  async getNotificationById(notificationId: string): Promise<Notification> {
    return this.notificationModel.findById(notificationId).orFail()
  }

  async insertExceedingNotification(notification: Notification): Promise<string> {
    let anomalyType: string = 'EXCEEDING'
    return await this.notificationModel
      .create({
        anomalyId: notification.anomaly.anomalyId,
        anomalyType: anomalyType,
        timestamp: notification.timestamp
      })
      .then((notification): string => {
        return notification._id.toString()
      })
      .catch((err): string => {
        throw err
      })
  }

  async insertIntrusionNotification(notification: Notification): Promise<string> {
    let anomalyType: string = 'INTRUSION'
    return await this.notificationModel
      .create({
        anomalyId: notification.anomaly.anomalyId,
        anomalyType: anomalyType,
        timestamp: notification.timestamp
      })
      .then((notification): string => {
        return notification._id.toString()
      })
      .catch((err): string => {
        throw err
      })
  }

  async updateExceedingNotification(notification: Notification): Promise<void> {
    let anomalyType: string = 'EXCEEDING'
    await this.notificationModel.findByIdAndUpdate(notification.notificationId, {
      anomalyType: anomalyType,
      timestamp: new Date()
    })
  }

  async updateIntrusionNotification(notification: Notification): Promise<void> {
    let anomalyType: string = 'INTRUSION'
    await this.notificationModel.findByIdAndUpdate(notification.notificationId, {
      anomalyType: anomalyType,
      timestamp: new Date()
    })
  }

  async deleteNotification(notificationId: string): Promise<void> {
    await this.notificationModel.deleteOne({ _id: notificationId }).orFail()
  }
}
