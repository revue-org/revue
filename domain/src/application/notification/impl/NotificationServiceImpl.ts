import { NotificationService } from '../NotificationService.js'
import { NotificationRepository } from '../../../domain/notification/repositories/NotificationRepository.js'
import { Notification } from '../../../domain/notification/core/Notification.js'
import { NotificationRepositoryImpl } from '../../../storage/notification/NotificationRepositoryImpl.js'
import { Model } from 'mongoose'

export class NotificationServiceImpl implements NotificationService {
  private notificationRepository: NotificationRepository
  private notifications: Notification[] = []

  constructor(notificationModel: Model<Notification>) {
    this.notificationRepository = new NotificationRepositoryImpl(notificationModel)
  }

  async getNotificationById(id: string): Promise<Notification> {
    return await this.notificationRepository.getNotificationById(id)
  }

  async getNotifications(): Promise<Notification[]> {
    return await this.notificationRepository.getNotifications()
  }

  async insertExceedingNotification(notification: Notification): Promise<string> {
    return await this.notificationRepository.insertExceedingNotification(notification).then((id: string) => {
      this.notifications.push(notification)
      return id
    })
  }

  async insertIntrusionNotification(notification: Notification): Promise<string> {
    return await this.notificationRepository.insertIntrusionNotification(notification).then((id: string) => {
      this.notifications.push(notification)
      return id
    })
  }

  async updateExceedingNotification(notification: Notification): Promise<void> {
    await this.notificationRepository.updateExceedingNotification(notification).then((): void => {
      this.notifications = this.notifications.map(
        (not: Notification): Notification =>
          not.notificationId === notification.notificationId ? notification : not
      )
    })
  }

  async updateIntrusionNotification(notification: Notification): Promise<void> {
    await this.notificationRepository.updateIntrusionNotification(notification).then((): void => {
      this.notifications = this.notifications.map(
        (not: Notification): Notification =>
          not.notificationId === notification.notificationId ? notification : not
      )
    })
  }

  async deleteNotification(id: string): Promise<void> {
    await this.notificationRepository.deleteNotification(id)
  }
}
