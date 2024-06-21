import { Notification } from '@/domain/core/Notification'
import { NotificationRepository } from '@/application/repositories/NotificationRepository'
import { NotificationService } from '@/application/services/NotificationService'
import { NotificationId } from '@/domain/core/NotificationId'
import { DomainEvent } from 'common/dist/domain/core/DomainEvent'
import { NotificationFactory } from '@/domain/factories/NotificationFactory'
import { NotificationEventsHub } from '@/application/services/NotificationEventsHub'
import { Anomaly } from 'common/dist/domain/core'

export class NotificationServiceImpl implements NotificationService {
  private repository: NotificationRepository
  private eventsHub: NotificationEventsHub

  constructor(notificationRepository: NotificationRepository, eventsHub: NotificationEventsHub) {
    this.repository = notificationRepository
    this.eventsHub = eventsHub
    this.setEventHub()
  }

  private setEventHub() {
    this.eventsHub.subscribeToAnomalies((anomaly: Anomaly) => {
      this.createNotification(anomaly, 'Anomaly detected')
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

  async createNotification(event: DomainEvent, message: string): Promise<void> {
    await this.repository.saveNotification(NotificationFactory.createNotification(event, message))
    // TODO: check if we need to send email notifications
  }

  sendMailNotification(notification: Notification, emails: string[]): void {
    emails.forEach((email: string): void => {
      console.log(`Sending email to ${email}`)
      //this.mailService.sendMail(contact.value, notification)
    })
  }

  async deleteNotification(id: NotificationId): Promise<void> {
    await this.repository.removeNotification(id)
  }
}
