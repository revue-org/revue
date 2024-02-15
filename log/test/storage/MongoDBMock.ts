import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { environmentDataModel } from '../../src/controller/environmentData.js'
import { environmentDataSample } from '../resources/environmentDataSample.js'

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

export const populateDevices = async (): Promise<void> => {
  await environmentDataModel.createCollection()
  await environmentDataModel.create(environmentDataSample)
}
