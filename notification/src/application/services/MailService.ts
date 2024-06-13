import { Notification } from '@/domain/core/Notification'

export interface MailService {
  sendMail(to: string, notification: Notification): void
}
