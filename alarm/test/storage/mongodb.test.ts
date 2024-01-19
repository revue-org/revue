import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import mongoose from 'mongoose'
import { DatabaseSimulator } from '../../src/utils/storage/DatabaseSimulator.js'

/*const exceedingModel: Model<Exceeding> = model<Exceeding>('Exceeding', exceedingSchema, 'anomaly')
const intrusionModel: Model<Intrusion> = model<Intrusion>('Intrusion', intrusionSchema, 'anomaly')*/

//qui da collegare il db fake, di la nei test invece nei before all mettere creazione database fake con populare e POI collegament oa supertest
let alarmService

describe('MongoDB connection test', async (): Promise<void> => {
  beforeAll(async (): Promise<void> => {
    await DatabaseSimulator.simulate()
    await DatabaseSimulator.createCollections()
    await DatabaseSimulator.populate()
    //alarmService = supertest(app)
  }, 20000)
  it('MongoDB connection test', async (): Promise<void> => {
    await mongoose
      .connect(DatabaseSimulator.connectionString(), { directConnection: true })
      .then(async (): Promise<void> => {
        expect(mongoose.connection.readyState).toBe(1)
      })
  }, 10000)

  afterAll(async (): Promise<void> => {
    await DatabaseSimulator.clean()
    await DatabaseSimulator.destroy()
  }, 20000)
})
