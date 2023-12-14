import { notificationController } from '../controller/notification.js'
import express from 'express'

export const notificationRouter = express.Router()

notificationRouter.route('/').get((req, res) => {
  notificationController.getNotifications(req, res)
})
//TODO to add get dell'id
notificationRouter.route('/:id').get((req, res) => {
  notificationController.getNotification(req, res)
})
notificationRouter.route('/').post((req, res) => {
  notificationController.createNotification(req, res)
})
notificationRouter.route('/').put((req, res) => {
  notificationController.updateNotification(req, res)
})
//TODO to add get dell'id
notificationRouter.route('/:id').delete((req, res) => {
  notificationController.deleteNotification(req, res)
})
