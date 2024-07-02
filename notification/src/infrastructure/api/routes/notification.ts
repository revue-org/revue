import { notificationController } from '@/infrastructure/api/controller/notification.js'
import express, { Request, Response, Router } from 'express'
import { Notification } from '@/domain/core/Notification'
import HttpStatusCode from '@utils/HttpStatusCode.js'

export const notificationRouter: Router = express.Router()

notificationRouter.route('/').get((req: Request, res: Response): void => {
  notificationController
    .getNotifications()
    .then((notifications: Notification[]): void => {
      res.status(HttpStatusCode.OK).send(notifications)
    })
    .catch((e): void => {
      console.log(e)
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

notificationRouter.route('/types/:type').get((req: Request, res: Response): void => {
  notificationController
    .getNotificationsByType(req.params.type)
    .then((notifications: Notification[]): void => {
      res.status(HttpStatusCode.OK).send(notifications)
    })
    .catch((): void => {
      res.send({ error: 'No notifications found' })
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
