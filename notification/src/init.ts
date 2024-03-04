import { model, Model } from 'mongoose'
import { Notification } from 'domain/dist/domain/notification/core/Notification.js'
import { notificationSchema } from 'domain/dist/storage/notification/schemas/NotificationSchema.js'
import { NotificationService } from 'domain/dist/application/notification/NotificationService.js'
import { NotificationServiceImpl } from 'domain/dist/application/notification/impl/NotificationServiceImpl.js'

export const notificationModel: Model<Notification> = model<Notification>(
  'Notification',
  notificationSchema,
  'notification'
)

const notificationService: NotificationService = new NotificationServiceImpl(notificationModel)
export default notificationService
