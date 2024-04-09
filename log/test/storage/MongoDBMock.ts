import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { environmentDataModel } from '../../src/init.js'
import { environmentDataSample } from '../resources/environmentDataSample.js'

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

export const populateDevices = async (): Promise<void> => {
  await environmentDataModel.createCollection()
  await environmentDataModel.create(environmentDataSample)
}
