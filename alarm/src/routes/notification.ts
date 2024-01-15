import { notificationController } from '../controller/notification.js'
import express, { Request, Response, Router } from 'express'
import { Notification } from 'domain/dist/domain/alarm-system/core/Notification.js'
import { AnomalyTypeConverter } from 'domain/dist/utils/AnomalyTypeConverter.js'
import { AnomalyType } from 'domain/dist/domain/anomaly/core/impl/enum/AnomalyType.js'
import { DeviceIdFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { DeviceIdFactory } from 'domain/dist/domain/device/factories/DeviceIdFactory.js'
import { MeasureConverter } from 'domain/dist/utils/MeasureConverter.js'
import { ObjectClassConverter } from 'domain/dist/utils/ObjectClassConverter.js'

export const notificationRouter: Router = express.Router()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

notificationRouter.route('/:id').get((req: Request, res: Response): void => {
  notificationController
    .getNotificationById(req.params.id)
    .then((notification: Notification): void => {
      res.send(notification)
    })
    .catch((): void => {
      res.send({ error: 'No notification found' })
    })
})

notificationRouter.route('/').get((req: Request, res: Response): void => {
  notificationController
    .getNotifications()
    .then((notifications: Notification[]): void => {
      res.send(notifications)
    })
    .catch((): void => {
      res.send({ error: 'No notifications found' })
    })
})
notificationRouter.route('/').post((req: Request, res: Response): void => {
  switch (AnomalyTypeConverter.convertToAnomalyType(req.body.type)) {
    case AnomalyType.EXCEEDING:
      notificationController
        .createExceedingNotification(
          req.body.anomalyId,
          deviceIdFactory.createSensorId(req.body.deviceId.code),
          MeasureConverter.convertToMeasure(req.body.measure),
          req.body.value
        )
        .then((): void => {
          res.send({ success: 'Notification created' })
        })
        .catch(() => {
          res.send({ error: 'Notification not created' })
        })
      break
    case AnomalyType.INTRUSION:
      notificationController
        .createIntrusionNotification(
          req.body.anomalyId,
          deviceIdFactory.createCameraId(req.body.deviceId.code),
          ObjectClassConverter.convertToObjectClass(req.body.intrusionObject)
        )
        .then((): void => {
          res.send({ success: 'Notification created' })
        })
        .catch(() => {
          res.send({ error: 'Notification not created' })
        })
      break
  }
})
notificationRouter.route('/').put((req: Request, res: Response): void => {
  switch (AnomalyTypeConverter.convertToAnomalyType(req.body.type)) {
    case AnomalyType.EXCEEDING:
      notificationController
        .updateExceedingNotification(
          req.body.id,
          req.body.anomalyId,
          deviceIdFactory.createSensorId(req.body.deviceId.code),
          new Date(req.body.timestamp),
          MeasureConverter.convertToMeasure(req.body.measure),
          req.body.value
        )
        .then((): void => {
          res.send({ success: 'Notification correctly updated' })
        })
        .catch((): void => {
          res.send({ error: 'Notification not updated' })
        })
      break
    case AnomalyType.INTRUSION:
      notificationController
        .updateIntrusionNotification(
          req.body.id,
          req.body.anomalyId,
          deviceIdFactory.createCameraId(req.body.deviceId.code),
          new Date(req.body.timestamp),
          ObjectClassConverter.convertToObjectClass(req.body.intrusionObject)
        )
        .then((): void => {
          res.send({ success: 'Notification correctly updated' })
        })
        .catch((): void => {
          res.send({ error: 'Notification not updated' })
        })
      break
  }
})

notificationRouter.route('/').delete((req: Request, res: Response): void => {
  notificationController
    .deleteNotification(req.body.id)
    .then((): void => {
      res.send({ success: 'Notification correctly deleted' })
    })
    .catch((): void => {
      res.send({ error: 'Notification not deleted' })
    })
})
