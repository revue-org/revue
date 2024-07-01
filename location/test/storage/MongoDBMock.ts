import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { locationSample, locationSample1 } from "../resources/locationSample.js";
import { LocationDBEntity } from "@/infrastructure/storage/models/LocationModel";
import { locationSchema } from "@/infrastructure/storage/schemas/LocationSchema.js";

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

export const populateLocations = async (): Promise<void> => {
  const _model = mongoose.model<LocationDBEntity>('Location', locationSchema, 'device')
  await _model.create(locationSample)
  await _model.create(locationSample1)
}
