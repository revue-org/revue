import type { Request } from 'express'
import { Model, model } from 'mongoose'
import { Notification } from '@domain/alarm-system/core/Notification.js'
import { NotificationRepository } from '@domain/alarm-system/repositories/NotificationRepository.js'
import { NotificationRepositoryImpl } from '@storage/alarm-system/NotificationRepositoryImpl.js'
import { NotificationFactory } from '@domain/alarm-system/factories/NotificationFactory.js'
import { NotificationFactoryImpl } from '@domain/alarm-system/factories/impl/NotificationFactoryImpl.js'
import { notificationSchema } from '@storage/alarm-system/schemas/NotificationSchema.js'
import { AnomalyTypeConverter } from 'domain/dist/utils/AnomalyTypeConverter.js'
import { AnomalyType } from '@domain/anomaly/core/impl/enum/AnomalyType.js'
import { AnomalyFactory } from '@domain/anomaly/factories/AnomalyFactory.js'
import { AnomalyFactoryImpl } from '@domain/anomaly/factories/impl/AnomalyFactoryImpl.js'
import { MeasureConverter } from '@utils/MeasureConverter.js'
import { ObjectClassConverter } from '@utils/ObjectClassConverter.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'

const notificationModel: Model<Notification> = model<Notification>(
  'Notification',
  notificationSchema,
  'notification'
)

const notificationManager: NotificationRepository = new NotificationRepositoryImpl(
  notificationModel
)
const notificationFactory: NotificationFactory = new NotificationFactoryImpl()
const anomalyFactory: AnomalyFactory = new AnomalyFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
export const notificationController = {
  getNotificationById: async (req: Request): Promise<Notification> => {
    return await notificationManager.getNotificationById(req.params.id)
  },
  getNotifications: async (): Promise<Notification[]> => {
    return await notificationManager.getNotifications()
  },
  createNotification: async (req: Request): Promise<void> => {
    switch (AnomalyTypeConverter.convertToAnomalyType(req.body.type)) {
      case AnomalyType.EXCEEDING:
        await notificationManager.insertNotification(
          notificationFactory.createExceedingNotification(
            '',
            anomalyFactory.createExceeding(
              req.body.anomalyId,
              deviceIdFactory.createId(req.body.deviceId.type, req.body.deviceId.code),
              new Date(),
              req.body.value,
              MeasureConverter.convertToMeasure(req.body.measure)
            )
          )
        )
        break
      case AnomalyType.INTRUSION:
        await notificationManager.insertNotification(
          notificationFactory.createIntrusionNotification(
            '',
            anomalyFactory.createIntrusion(
              req.body.anomalyId,
              deviceIdFactory.createId(req.body.deviceId.type, req.body.deviceId.code),
              new Date(),
              ObjectClassConverter.convertToObjectClass(req.body.intrusionObject)
            )
          )
        )
        break
      default:
        throw new Error('Error while creating anomaly')
    }
  },
  updateNotification: async (req: Request): Promise<void> => {
    switch (AnomalyTypeConverter.convertToAnomalyType(req.body.type)) {
      case AnomalyType.EXCEEDING:
        await notificationManager.updateNotification(
          notificationFactory.createExceedingNotification(
            req.body.id,
            anomalyFactory.createExceeding(
              req.body.anomalyId,
              deviceIdFactory.createId(req.body.deviceId.type, req.body.deviceId.code),
              new Date(),
              req.body.value,
              MeasureConverter.convertToMeasure(req.body.measure)
            )
          )
        )
        break
      case AnomalyType.INTRUSION:
        await notificationManager.updateNotification(
          notificationFactory.createIntrusionNotification(
            req.body.id,
            anomalyFactory.createIntrusion(
              req.body.anomalyId,
              deviceIdFactory.createId(req.body.deviceId.type, req.body.deviceId.code),
              new Date(),
              ObjectClassConverter.convertToObjectClass(req.body.intrusionObject)
            )
          )
        )
        break
      default:
        throw new Error('Error while creating anomaly')
    }
  },
  deleteNotification: async (req: Request): Promise<void> => {
    return await notificationManager.deleteNotification(req.body.id)
  }
}
