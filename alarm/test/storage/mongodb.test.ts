import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import mongoose from 'mongoose'
import { DatabaseSimulator } from '../../src/utils/storage/DatabaseSimulator.js'
import supertest, {Response, Request} from "supertest";
import { TOKEN } from "../common";

describe('MongoDB connection test', async (): Promise<void> => {

  it('MongoDB connection test', async (): Promise<void> => {
    await mongoose
      .connect(DatabaseSimulator.connectionString(), { directConnection: true })
      .then(async (): Promise<void> => {
        expect(mongoose.connection.readyState).toBe(1)
      })
  }, 10000)

  it('responds with the notifications otherwise', async (): Promise<void> => {
    // @ts-ignore
    let alarmServiceTest = alarmService
    const notifications: Response = await alarmServiceTest
      .get('/notifications/')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(notifications.status).toBe(200)
    expect(notifications.type).toBe('application/json')
    expect(notifications.type).toBe(notifications.body)
  })

})
