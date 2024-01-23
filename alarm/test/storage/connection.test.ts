import { describe, expect, it } from 'vitest'
import mongoose from 'mongoose'
import { DatabaseSimulator } from '../../src/utils/storage/DatabaseSimulator.js'

describe('MongoDB connection test', async (): Promise<void> => {
  it('MongoDB connection test', async (): Promise<void> => {
    mongoose.createConnection(DatabaseSimulator.connectionString(), {
      directConnection: true
    })
    expect(mongoose.connection.readyState).toBe(1)
  }, 100000)

}, 100000)
