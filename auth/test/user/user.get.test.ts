import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { connectToMock, disconnectFromMock, populateUsers } from "../storage/MongoDBMock.js";
import HttpStatusCode from '../../src/utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('GET /users/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateUsers()
  })

  it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
    // @ts-ignore
    const users: Response = await alarmService.get('/users/')
    expect(users.status).toBe(HttpStatusCode.FORBIDDEN)
  })

  it('responds with the users otherwise', async (): Promise<void> => {
    // @ts-ignore
    const users: Response = await alarmService
      .get('/users/')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(users.status).toBe(HttpStatusCode.OK)
    expect(users.type).toBe('application/json')
  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  });
})
