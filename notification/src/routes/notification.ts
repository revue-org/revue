import { notificationController } from '../controller/notification.js'
import express, { Request, Response, Router } from 'express'
import { Notification } from '@domain/notification/core/Notification.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { MeasureConverter } from '@utils/MeasureConverter.js'
import { ObjectClassConverter } from '@utils/ObjectClassConverter.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

export const notificationRouter: Router = express.Router()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

notificationRouter.route('/').get((req: Request, res: Response): void => {
  notificationController
    .getNotifications()
    .then((notifications: Notification[]): void => {
      res.status(HttpStatusCode.OK).send(notifications)
    })
    .catch((): void => {
      res.send({ error: 'No notifications found' })
    })
})

notificationRouter.route('/:id').get((req: Request, res: Response): void => {
  notificationController
    .getNotificationById(req.params.id)
    .then((notification: Notification): void => {
      res.status(HttpStatusCode.OK).status(HttpStatusCode.OK).send(notification)
    })
    .catch((): void => {
      res.send({ error: 'No notification found' })
    })
})

notificationRouter.route('/exceedings').post((req: Request, res: Response): void => {
  notificationController
    .createExceedingNotification(
      req.body.anomalyId,
      deviceIdFactory.createSensorId(req.body.deviceId.code),
      MeasureConverter.convertToMeasure(req.body.measure),
      req.body.value
    )
    .then((): void => {
      res.status(HttpStatusCode.CREATED).send({ success: 'Notification created' })
    })
    .catch((): void => {
      res.send({ error: 'Notification not created' })
    })
})

notificationRouter.route('/intrusions').post((req: Request, res: Response): void => {
  notificationController
    .createIntrusionNotification(
      req.body.anomalyId,
      deviceIdFactory.createCameraId(req.body.deviceId.code),
      ObjectClassConverter.convertToObjectClass(req.body.intrusionObject)
    )
    .then((): void => {
      res.status(HttpStatusCode.CREATED).send({ success: 'Notification created' })
    })
    .catch((): void => {
      res.send({ error: 'Notification not created' })
    })
})

notificationRouter.route('/:id').delete((req: Request, res: Response): void => {
  notificationController
    .deleteNotification(req.params.id)
    .then((): void => {
      res.status(HttpStatusCode.OK).send({ success: 'Notification correctly deleted' })
    })
    .catch((): void => {
      res.send({ error: 'Notification not deleted' })
    })
})
