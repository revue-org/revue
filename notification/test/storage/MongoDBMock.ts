import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { notificationModel } from '../../src/init.js'
import { notificationSample } from '../resources/notificationSample.js'

let mongoMock: any = null

export const connectToMock = async (): Promise<void> => {
  try {
    mongoMock = await MongoMemoryServer.create()
    await mongoose.connect(mongoMock.getUri(), {
      directConnection: true
    })
  } catch (err) {
    throw err
  }
}

export const disconnectFromMock = async (): Promise<void> => {
  try {
    await mongoose.connection.close()
    if (mongoMock) {
      await mongoMock.stop()
    }
  } catch (err) {
    throw err
  }
}

export const populateNotifications = async (): Promise<void> => {
  await notificationModel.createCollection()
  await notificationModel.create(notificationSample)
}
