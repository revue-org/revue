import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { cameraModel, sensorModel } from '../../src/init.js'
import { sensorSample } from '../resources/sensorSample.js'
import { cameraSample } from '../resources/cameraSample.js'

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
  await cameraModel.createCollection()
  await cameraModel.create(cameraSample)
  await sensorModel.create(sensorSample)
}
