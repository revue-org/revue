/*
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { userModel } from '../../src/init.js'
import { userSample } from '../resources/userSample.js'

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

export const populateUsers = async (): Promise<void> => {
  await userModel.createCollection()
  await userModel.create(userSample)
}
*/
