import { Notification } from '@/domain/core/Notification'
import { Contact } from 'common/dist/domain/core/Contact'
import { ContactType } from 'common/dist/domain/core/ContactType'
import { NotificationRepository } from '@/application/repositories/NotificationRepository'
import { NotificationService } from '@/application/services/NotificationService'
import { NotificationId } from '@/domain/core/NotificationId'

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

  async createNotification(notification: Notification): Promise<void> {
    //const id = await this.repository.saveNotification(notification)
    //TODO: to retrieve contacts from user service(?)
    //this.sendMailNotification(notification, notification.contacts)
    console.log(notification)
  }

  sendMailNotification(notification: Notification, contacts: Contact[]): void {
    contacts
      .filter((contact: Contact): boolean => contact.type === ContactType.EMAIL)
      .forEach((contact: Contact): void => {
        console.log(`Sending email to ${contact.value}`)
        //this.mailService.sendMail(contact.value, notification)
      })
  }

  deleteNotification(id: NotificationId): void {
    this.repository.removeNotification(id)
  }
}
