import { model, Model } from 'mongoose'
import nodemailer from 'nodemailer'
import { Notification } from 'domain/dist/domain/notification/core/Notification.js'
import { notificationSchema } from 'domain/dist/storage/notification/schemas/NotificationSchema.js'
import { NotificationService } from 'domain/dist/application/notification/NotificationService.js'
import { NotificationServiceImpl } from 'domain/dist/application/notification/impl/NotificationServiceImpl.js'
import { NotificationRepository } from 'domain/dist/domain/notification/repositories/NotificationRepository.js'
import { NotificationRepositoryImpl } from 'domain/dist/storage/notification/NotificationRepositoryImpl.js'
import { MailService } from 'domain/dist/application/notification/MailService.js'
import { MailServiceImpl } from 'domain/dist/application/notification/impl/MailServiceImpl.js'

export const notificationModel: Model<Notification> = model<Notification>(
  'Notification',
  notificationSchema,
  'notification'
)

const notificationRepository: NotificationRepository = new NotificationRepositoryImpl(notificationModel)

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'revue.noreply@gmail.com',
      pass: ''
    }
  })
const mailService: MailService = new MailServiceImpl(transporter)
export const notificationService: NotificationService = new NotificationServiceImpl(
  notificationRepository,
  mailService
)
