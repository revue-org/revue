import { Model, model } from 'mongoose'
import { Notification } from '@domain/notification/core/Notification.js'
import { NotificationRepository } from '@domain/notification/repositories/NotificationRepository.js'
import { NotificationRepositoryImpl } from '@storage/notification/NotificationRepositoryImpl.js'
import { NotificationFactory } from '@domain/notification/factories/NotificationFactory.js'
import { NotificationFactoryImpl } from '@domain/notification/factories/impl/NotificationFactoryImpl.js'
import { notificationSchema } from '@storage/notification/schemas/NotificationSchema.js'
import { AnomalyFactory } from '@domain/alarm-system/factories/AnomalyFactory.js'
import { AnomalyFactoryImpl } from '@domain/alarm-system/factories/impl/AnomalyFactoryImpl.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { DeviceId } from '@domain/device/core/DeviceId.js'
import { ObjectClass } from '@domain/alarm-system/core/impl/enum/ObjectClass.js'

export const notificationModel: Model<Notification> = model<Notification>(
  'Notification',
  notificationSchema,
  'notification'
)

const notificationRepository: NotificationRepository = new NotificationRepositoryImpl(notificationModel)
const notificationFactory: NotificationFactory = new NotificationFactoryImpl()
const anomalyFactory: AnomalyFactory = new AnomalyFactoryImpl()
export const notificationController = {
  getNotificationById: async (id: string): Promise<Notification> => {
    return await notificationRepository.getNotificationById(id)
  },
  getNotifications: async (): Promise<Notification[]> => {
    return await notificationRepository.getNotifications()
  },
  createExceedingNotification: async (
    anomalyId: string,
    deviceId: DeviceId,
    measure: Measure,
    value: number
  ): Promise<string> => {
    return await notificationRepository.insertExceedingNotification(
      notificationFactory.createExceedingNotification(
        '',
        anomalyFactory.createExceeding(deviceId, new Date(), value, measure, anomalyId)
      )
    )
  },
  createIntrusionNotification: async (
    anomalyId: string,
    deviceId: DeviceId,
    intrusionObject: ObjectClass
  ): Promise<string> => {
    return await notificationRepository.insertIntrusionNotification(
      notificationFactory.createIntrusionNotification(
        '',
        anomalyFactory.createIntrusion(deviceId, new Date(), intrusionObject, anomalyId)
      )
    )
  },
  updateExceedingNotification: async (
    notificationId: string,
    anomalyId: string,
    deviceId: DeviceId,
    timestamp: Date,
    measure: Measure,
    value: number
  ): Promise<void> => {
    await notificationRepository.updateExceedingNotification(
      notificationFactory.createExceedingNotification(
        notificationId,
        anomalyFactory.createExceeding(deviceId, timestamp, value, measure, anomalyId)
      )
    )
  },
  updateIntrusionNotification: async (
    notificationId: string,
    anomalyId: string,
    deviceId: DeviceId,
    timestamp: Date,
    intrusionObject: ObjectClass
  ): Promise<void> => {
    await notificationRepository.updateIntrusionNotification(
      notificationFactory.createIntrusionNotification(
        notificationId,
        anomalyFactory.createIntrusion(deviceId, timestamp, intrusionObject, anomalyId)
      )
    )
  },
  deleteNotification: async (id: string): Promise<void> => {
    return await notificationRepository.deleteNotification(id)
  }
}
