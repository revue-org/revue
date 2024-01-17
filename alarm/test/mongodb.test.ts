import { MongoDBContainer, StartedMongoDBContainer } from '@testcontainers/mongodb'
import mongoose from 'mongoose'
import { afterAll, beforeAll, it } from 'vitest'
import * as console from "console";

import { describe } from 'vitest'

let mongoContainer: StartedMongoDBContainer
//${process.env.DB_NAME}?authSource=admin
const connectionString: string = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/`

describe('MongoDB first test', (): void => {
  beforeAll(async (): Promise<void> => {
    // Start the MongoDB Docker container
    mongoContainer = await new MongoDBContainer().withExposedPorts(27017).start()
  })

  it('should connect to MongoDB', async (): Promise<void> => {
    await mongoose.connect(connectionString)
    console.log(mongoose.connection.readyState)
    console.log('Connected successfully to db')
  })

  afterAll(async (): Promise<void> => {
    if (mongoContainer) {
      await mongoose.disconnect()
      await mongoContainer.stop()
    }
  })
})
