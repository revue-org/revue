import { Model, model } from 'mongoose'
import { Notification } from '@domain/alarm-system/core/Notification.js'
import { NotificationRepository } from '@domain/alarm-system/repositories/NotificationRepository.js'
import { NotificationRepositoryImpl } from '@storage/alarm-system/NotificationRepositoryImpl.js'
import { NotificationFactory } from '@domain/alarm-system/factories/NotificationFactory.js'
import { NotificationFactoryImpl } from '@domain/alarm-system/factories/impl/NotificationFactoryImpl.js'
import { notificationSchema } from '@storage/alarm-system/schemas/NotificationSchema.js'
import { AnomalyFactory } from '@domain/anomaly/factories/AnomalyFactory.js'
import { AnomalyFactoryImpl } from '@domain/anomaly/factories/impl/AnomalyFactoryImpl.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { DeviceId } from '@domain/device/core/DeviceId.js'
import { ObjectClass } from '@domain/security-rule/core/impl/enum/ObjectClass.js'

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
  ): Promise<void> => {
    await notificationRepository.insertExceedingNotification(
      notificationFactory.createExceedingNotification(
        '',
        anomalyFactory.createExceeding(anomalyId, deviceId, new Date(), value, measure)
      )
    )
  },
  createIntrusionNotification: async (
    anomalyId: string,
    deviceId: DeviceId,
    intrusionObject: ObjectClass
  ): Promise<void> => {
    await notificationRepository.insertIntrusionNotification(
      notificationFactory.createIntrusionNotification(
        '',
        anomalyFactory.createIntrusion(anomalyId, deviceId, new Date(), intrusionObject)
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
        anomalyFactory.createExceeding(anomalyId, deviceId, timestamp, value, measure)
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
        anomalyFactory.createIntrusion(anomalyId, deviceId, timestamp, intrusionObject)
      )
    )
  },
  deleteNotification: async (id: string): Promise<void> => {
    return await notificationRepository.deleteNotification(id)
  }
}
