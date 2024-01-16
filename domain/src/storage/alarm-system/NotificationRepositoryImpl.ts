import { NotificationRepository } from '../../domain/alarm-system/repositories/NotificationRepository'
import { Model, Promise } from 'mongoose'
import { Notification } from '../../domain/alarm-system/core/Notification.js'

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

  async insertExceedingNotification(notification: Notification): Promise<void> {
    let anomalyType: string = 'EXCEEDING'
    await this.notificationModel
      .create({
        anomalyId: notification.anomaly.anomalyId,
        anomalyType: anomalyType,
        timestamp: notification.timestamp
      })
      .catch((err): void => {
        throw err
      })
  }

  async insertIntrusionNotification(notification: Notification): Promise<void> {
    let anomalyType: string = 'INTRUSION'
    await this.notificationModel
      .create({
        anomalyId: notification.anomaly.anomalyId,
        anomalyType: anomalyType,
        timestamp: notification.timestamp
      })
      .catch((err): void => {
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
