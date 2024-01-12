import { NotificationRepository } from '../../domain/alarm-system/repositories/NotificationRepository'
import { Model, Promise } from 'mongoose'
import { Notification } from '../../domain/alarm-system/core/Notification.js'
import { ExceedingImpl } from '../../domain/anomaly/core/impl/ExceedingImpl.js'
import { IntrusionImpl } from '../../domain/anomaly/core/impl/IntrusionImpl.js'

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

  async insertNotification(notification: Notification): Promise<void> {
    let anomalyType: string = ''
    if (notification.anomaly instanceof ExceedingImpl) {
      anomalyType = 'EXCEEDING'
    }
    if (notification.anomaly instanceof IntrusionImpl) {
      anomalyType = 'INTRUSION'
    }
    await this.notificationModel
      .create({
        anomalyId: notification.anomaly.anomalyId,
        anomalyType: anomalyType,
        timestamp: notification.timestamp
      })
      .catch((err): void => {
        console.log(err)
        throw err
      })
  }

  async updateNotification(notification: Notification): Promise<void> {
    let anomalyType: string = ''
    if (notification.anomaly instanceof ExceedingImpl) {
      anomalyType = 'EXCEEDING'
    }
    if (notification.anomaly instanceof IntrusionImpl) {
      anomalyType = 'INTRUSION'
    }
    await this.notificationModel.findByIdAndUpdate(notification.notificationId, {
      anomalyType: anomalyType,
      timestamp: new Date()
    })
  }

  async deleteNotification(notificationId:string): Promise<void> {
    await this.notificationModel.deleteOne({ _id: notificationId }).orFail()
  }
}
