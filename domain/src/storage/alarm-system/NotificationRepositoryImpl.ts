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
    switch (typeof notification.anomaly) {
      case typeof ExceedingImpl:
        anomalyType = 'EXCEEDING'
        break
      case typeof IntrusionImpl:
        anomalyType = 'INTRUSION'
        break
    }
    await this.notificationModel.create({
      _id: notification.notificationId,
      anomalyId: notification.anomaly.anomalyId,
      anomalyType: anomalyType,
      timestamp: notification.timestamp
    })
  }

  async updateNotification(notification: Notification): Promise<void> {
    let anomalyType: string = ''
    switch (typeof notification.anomaly) {
      case typeof ExceedingImpl:
        anomalyType = 'EXCEEDING'
        break
      case typeof IntrusionImpl:
        anomalyType = 'INTRUSION'
        break
    }
    await this.notificationModel.findByIdAndUpdate(notification.notificationId, {
      anomalyId: notification.anomaly.anomalyId,
      anomalyType: anomalyType,
      timestamp: new Date()
    })
  }

  async deleteNotification(notificationId: string): Promise<void> {
    await this.notificationModel.findByIdAndDelete(notificationId)
  }
}
