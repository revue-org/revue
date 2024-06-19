/*
import { beforeAll, describe, expect, test } from 'vitest'
import mongoose from 'mongoose'
import { notificationModel } from '../../src/init'
import { mongoConnect } from 'domain/dist/utils/connection'
import { NotificationService } from 'domain/dist/application/notification/NotificationService.js'
import { NotificationRepository } from 'domain/dist/domain/notification/repositories/NotificationRepository.js'
import { NotificationRepositoryImpl } from 'domain/dist/storage/notification/NotificationRepositoryImpl.js'
import { NotificationServiceImpl } from 'domain/dist/application/notification/impl/NotificationServiceImpl.js'
import { MailService } from 'domain/dist/application/notification/MailService.js'
import { MailServiceImpl } from 'domain/dist/application/notification/impl/MailServiceImpl.js'

describe(`When auth service is down`, (): void => {
  let notificationService: NotificationService

  beforeAll(async (): Promise<void> => {
    const username: string = process.env.NOTIFICATION_DB_USERNAME || 'admin'
    const password: string = process.env.NOTIFICATION_DB_PASSWORD || 'admin'
    const host: string =
      process.env.NODE_ENV === 'develop' ? 'localhost' : process.env.NOTIFICATION_DB_HOST || 'localhost'
    const dbPort: string =
      process.env.NODE_ENV === 'develop'
        ? process.env.NOTIFICATION_DB_PORT || '27017'
        : process.env.DEFAULT_DB_PORT || '27017'
    const dbName: string = process.env.NOTIFICATION_DB_NAME || 'notification'

    await mongoConnect(mongoose, username, password, host, dbPort, dbName)
    const notificationRepository: NotificationRepository = new NotificationRepositoryImpl(notificationModel)
    const mailService: MailService = new MailServiceImpl(null)
    notificationService = new NotificationServiceImpl(notificationRepository, mailService)
  })

  test('notifications should continue to be sent', async (): Promise<void> => {
    const actualNotification: number = (await notificationService.getNotifications()).length
    await new Promise(
      (resolve): NodeJS.Timeout =>
        // waiting for the sensor to produce exceeding values detected by alarm system
        setTimeout(resolve, 6000)
    )
    const newNotifications: number = (await notificationService.getNotifications()).length
    expect(newNotifications, 'New notifications has been generated in the meanwhile').toBeGreaterThan(
      actualNotification
    )
  })
})
*/
