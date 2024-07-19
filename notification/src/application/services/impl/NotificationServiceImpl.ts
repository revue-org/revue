import { Notification } from '@/domain/core/Notification'
import { NotificationRepository } from '@/application/repositories/NotificationRepository'
import { NotificationService } from '@/application/services/NotificationService'
import { NotificationId } from '@/domain/core/NotificationId'
import { DomainEvent } from '@common/domain/core/DomainEvent'
import { NotificationFactory } from '@/domain/factories/NotificationFactory.js'
import { NotificationEventsHub } from '@/application/services/NotificationEventsHub'
import { Anomaly } from '@common/domain/core'

export class NotificationServiceImpl implements NotificationService {
  private repository: NotificationRepository
  private events: NotificationEventsHub

  constructor(notificationRepository: NotificationRepository, eventsHub: NotificationEventsHub) {
    this.repository = notificationRepository
    this.events = eventsHub
    this.configureEvents()
  }

  private configureEvents() {
    this.events.subscribeToAnomalies(async (anomaly: Anomaly): Promise<void> => {
      const notificationId: NotificationId = await this.createNotification(anomaly, 'Anomaly detected')
      this.getNotificationById(notificationId).then((notification: Notification): void => {
        this.events.publishNotification(notification)
      })
    })
  }

  async getNotifications(): Promise<Notification[]> {
    return await this.repository.getNotifications()
  }

  async getNotificationById(id: NotificationId): Promise<Notification> {
    return await this.repository.getNotificationById(id)
  }

  async getNotificationsByType(type: any): Promise<Notification[]> {
    return await this.repository.getNotificationsByType(type)
  }

  async createNotification(event: DomainEvent, message: string): Promise<NotificationId> {
    return await this.repository.saveNotification(NotificationFactory.createNotification(event, message))
  }

  async deleteNotification(id: NotificationId): Promise<void> {
    await this.repository.removeNotification(id)
  }

  sendMailNotification(notification: Notification, emails: string[]): void {
    emails.forEach((email: string): void => {
      console.log(`Sending email to ${email}`)
      //this.mailService.sendMail(contact.value, notification)
    })
  }
}
