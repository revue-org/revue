import { Notification } from '@/domain/core/Notification'
import { Contact } from 'common/dist/domain/core/Contact'
import { ContactType } from 'common/dist/domain/core/ContactType'
import { NotificationRepository } from '@/application/repositories/NotificationRepository'
import { NotificationService } from '@/application/services/NotificationService'
import { NotificationId } from '@/domain/core/NotificationId'
import { DomainEventType } from 'common/dist/domain/core/DomainEventType'
import { DomainEvent } from 'common/dist/domain/core/DomainEvent'
import { NotificationFactory } from '@/domain/factories/NotificationFactory'

export class NotificationServiceImpl implements NotificationService {
  private repository: NotificationRepository

  constructor(notificationRepository: NotificationRepository) {
    this.repository = notificationRepository
  }

  async getNotifications(): Promise<Notification[]> {
    return await this.repository.getNotifications()
  }

  async getNotificationById(id: NotificationId): Promise<Notification> {
    return await this.repository.getNotificationById(id)
  }

  async getNotificationsByType(type: DomainEventType): Promise<Notification[]> {
    return await this.repository.getNotificationsByType(type)
  }

  async createNotification(
    id: NotificationId,
    type: DomainEventType,
    event: DomainEvent,
    message: string
  ): Promise<void> {
    await this.repository.saveNotification(NotificationFactory.createNotification(id, type, event, message))
    //send the notification to the contacts
  }

  sendMailNotification(notification: Notification, contacts: Contact[]): void {
    contacts
      .filter((contact: Contact): boolean => contact.type === ContactType.EMAIL)
      .forEach((contact: Contact): void => {
        console.log(`Sending email to ${contact.value}`)
        //this.mailService.sendMail(contact.value, notification)
      })
  }

  async deleteNotification(id: NotificationId): Promise<void> {
    await this.repository.removeNotification(id)
  }
}
