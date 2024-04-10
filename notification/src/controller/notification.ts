import { Notification } from '@domain/notification/core/Notification.js'
import { NotificationFactory } from '@domain/notification/factories/NotificationFactory.js'
import { NotificationFactoryImpl } from '@domain/notification/factories/impl/NotificationFactoryImpl.js'
import { AnomalyFactory } from '@domain/alarm-system/factories/AnomalyFactory.js'
import { AnomalyFactoryImpl } from '@domain/alarm-system/factories/impl/AnomalyFactoryImpl.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { DeviceId } from '@domain/device/core/DeviceId.js'
import { ObjectClass } from '@domain/alarm-system/core/impl/enum/ObjectClass.js'
import { Contact } from '@domain/monitoring/core/Contact.js'
import { notificationService } from '../init.js'
import { io } from '../index.js'

const notificationFactory: NotificationFactory = new NotificationFactoryImpl()
const anomalyFactory: AnomalyFactory = new AnomalyFactoryImpl()
export const notificationController = {
  getNotificationById: async (id: string): Promise<Notification> => {
    return await notificationService.getNotificationById(id)
  },
  getNotifications: async (): Promise<Notification[]> => {
    return await notificationService.getNotifications()
  },
  createExceedingNotification: async (
    anomalyId: string,
    deviceId: DeviceId,
    measure: Measure,
    value: number,
    contacts: Contact[]
  ): Promise<string> => {
    const notification: Notification = notificationFactory.createExceedingNotification(
      '',
      anomalyFactory.createExceeding(deviceId, new Date(), measure, value, anomalyId)
    )
    const notificationId: string = await notificationService.insertExceedingNotification(notification)
    //notificationService.sendMailNotification(notification, contacts)
    io.emit('notification', { type: 'EXCEEDING' })
    return notificationId
  },
  createIntrusionNotification: async (
    anomalyId: string,
    deviceId: DeviceId,
    intrusionObject: ObjectClass,
    contacts: Contact[]
  ): Promise<string> => {
    const notification: Notification = notificationFactory.createIntrusionNotification(
      '',
      anomalyFactory.createIntrusion(deviceId, new Date(), intrusionObject, anomalyId)
    )
    const notificationId: string = await notificationService.insertIntrusionNotification(notification)
    notificationService.sendMailNotification(notification, contacts)
    io.emit('notification', { type: 'INTRUSION' })
    return notificationId
  },
  updateExceedingNotification: async (
    notificationId: string,
    anomalyId: string,
    deviceId: DeviceId,
    timestamp: Date,
    measure: Measure,
    value: number
  ): Promise<void> => {
    notificationService.updateExceedingNotification(
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
    notificationService.updateIntrusionNotification(
      notificationFactory.createIntrusionNotification(
        notificationId,
        anomalyFactory.createIntrusion(deviceId, timestamp, intrusionObject, anomalyId)
      )
    )
  },
  deleteNotification: async (id: string): Promise<void> => {
    return notificationService.deleteNotification(id)
  }
}
