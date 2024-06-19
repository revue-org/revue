import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { intrusionSample, outlierSample } from "../resources/notificationSample.js";
import { NotificationDBEntity } from '@/infrastructure/storage/models/NotificationModel'
import { notificationSchema } from '@/infrastructure/storage/schemas/NotificationSchema'

let mongoMock: any = null

export const connectToMock = async (): Promise<void> => {
  mongoMock = await MongoMemoryServer.create()
  await mongoose.connect(mongoMock.getUri(), {
    directConnection: true
  })
}

export const disconnectFromMock = async (): Promise<void> => {
  await mongoose.connection.close()
  if (mongoMock) {
    await mongoMock.stop()
  }
}

export const populateNotifications = async (): Promise<void> => {
  const _model = mongoose.model<NotificationDBEntity>(
    'NotificationSchema',
    notificationSchema,
    'notification'
  )
  await _model.create(outlierSample)
  await _model.create(intrusionSample)
}
