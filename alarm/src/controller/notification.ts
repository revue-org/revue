import type { Request } from 'express'
import { Model, model } from 'mongoose'
import { Notification } from '@domain/alarm-system/core/Notification.js'
import { NotificationRepository } from '@domain/alarm-system/repositories/NotificationRepository.js'
import { NotificationRepositoryImpl } from '@storage/alarm-system/NotificationRepositoryImpl.js'
import { NotificationFactory } from '@domain/alarm-system/factories/NotificationFactory.js'
import { NotificationFactoryImpl } from '@domain/alarm-system/factories/impl/NotificationFactoryImpl.js'
import { exceedingSchema } from '@storage/anomaly/schemas/ExceedingSchema.js'

const notificationModel: Model<Notification> = model<Notification>(
  'Notification',
  exceedingSchema,
  'notification'
)

const notificationManager: NotificationRepository = new NotificationRepositoryImpl(
  notificationModel
)
const notificationFactory: NotificationFactory = new NotificationFactoryImpl()

export const notificationController = {
  getNotification: async (req: Request): Promise<void> => {
    //Promise<Notification>
    //return await notificationManager.getUserById(req.params.id)
    //TODO
  },
  getNotifications: async (): Promise<Notification[]> => {
    return await notificationManager.getNotifications()
  },
  createNotification: async (req: Request): Promise<void> => {
    /*    const user: Notification = notificationFactory.createExceedingNotification(
          req.body.id,
          req.body.name,
          req.body.surname,
          req.body.username,
          req.body.password,
          req.body.token,
          req.body.refreshToken,
          req.body.contact,
          req.body.deviceIds
        )*/
    //await notificationManager.insertNotification()
  },
  updateNotification: async (req: Request): Promise<void> => {
    //await notificationManager.updateNotification()
  },
  deleteNotification: async (req: Request): Promise<void> => {
    //await notificationManager.deleteNotification()
  }
}
