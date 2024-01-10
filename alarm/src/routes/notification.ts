import { notificationController } from '../controller/notification.js'
import express, { Router } from 'express'
import { Notification } from 'domain/dist/domain/alarm-system/core/Notification.js'

export const notificationRouter: Router = express.Router()

notificationRouter.route('/').get((req, res) => {
  notificationController
    .getNotifications()
    .then((notifications: Notification[]): void => {
      res.send(notifications)
    })
    .catch((): void => {
      res.send({ error: 'No notifications found' })
    })
})
notificationRouter.route('/').post((req, res) => {
  notificationController
    .createNotification(req)
    .then((): void => {
      res.send({ success: 'Notification created' })
    })
    .catch(() => {
      res.send({ error: 'Notification not created' })
    })
})
notificationRouter.route('/').put((req, res) => {
  notificationController
    .updateNotification(req)
    .then((): void => {
      res.send({ success: 'Notification correctly updated' })
    })
    .catch((): void => {
      res.send({ error: 'Notification not updated' })
    })
})

notificationRouter.route('/:id').delete((req, res) => {
  notificationController.deleteNotification(req)
})
