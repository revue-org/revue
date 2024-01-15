import { notificationController } from '../controller/notification.js'
import express, { Request, Response, Router } from 'express'
import { Notification } from 'domain/dist/domain/alarm-system/core/Notification.js'

export const notificationRouter: Router = express.Router()

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
  notificationController
    .createNotification(req)
    .then((): void => {
      res.send({ success: 'Notification created' })
    })
    .catch(() => {
      res.send({ error: 'Notification not created' })
    })
})
notificationRouter.route('/').put((req: Request, res: Response): void => {
  notificationController
    .updateNotification(req)
    .then((): void => {
      res.send({ success: 'Notification correctly updated' })
    })
    .catch((): void => {
      res.send({ error: 'Notification not updated' })
    })
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
