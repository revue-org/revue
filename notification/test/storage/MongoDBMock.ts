import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { notificationModel } from '../../src/init.js'
import { notificationSample } from '../resources/notificationSample.js'

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
  await notificationModel.createCollection()
  await notificationModel.create(notificationSample)
}
