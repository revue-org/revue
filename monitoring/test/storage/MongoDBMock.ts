import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { cameraModel, sensorModel } from '../../src/init.js'
import { sensorSample } from '../resources/sensorSample.js'
import { cameraSample } from '../resources/cameraSample.js'

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
  await cameraModel.createCollection()
  await cameraModel.create(cameraSample)
  await sensorModel.create(sensorSample)
}
