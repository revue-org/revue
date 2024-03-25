import { Notification } from "../../domain/notification/core/Notification.js";

export interface MailService {
  sendMail(to: string, notification: Notification): void
}
