import type { Request, Response } from 'express'
import { Model, model } from 'mongoose'
import { Notification } from 'domain/dist/domain/alarm-system/core/Notification.js'
import { notificationSchema } from 'domain/dist/storage/alarm-system/schemas/notificationSchema.js'
import { NotificationRepository } from 'domain/dist/domain/alarm-system/repositories/NotificationRepository.js'
import { NotificationRepositoryImpl } from 'domain/dist/storage/alarm-system/NotificationRepositoryImpl.js'
import { NotificationFactory } from 'domain/dist/domain/alarm-system/factories/NotificationFactory.js'
import { NotificationFactoryImpl } from 'domain/dist/domain/alarm-system/factories/impl/NotificationFactoryImpl.js'

const notificationModel: Model<Notification> = model<Notification>(
  'Notification',
  notificationSchema,
  'notification'
)
const notificationManager: NotificationRepository = new NotificationRepositoryImpl(
  notificationModel
)
const notificationFactory: NotificationFactory = new NotificationFactoryImpl()

export const notificationController = {
  getNotifications: async (req: Request, res: Response) => {
    res.json('ok')
  },
  getNotification: async (req: Request, res: Response) => {
    res.json('ok')
  },
  createNotification: async (req: Request, res: Response) => {
    res.json('ok')
  },
  updateNotification: async (req: Request, res: Response) => {
    res.json('ok')
  },
  deleteNotification: async (req: Request, res: Response) => {
    res.json('ok')
  }
}
