import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { connectToMock, disconnectFromMock, populateUsers } from "../storage/MongoDBMock.js";
import HttpStatusCode from '../../src/utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('POST /login/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateUsers()
  })

  it('responds with a valid JSON Web Token otherwise', async (): Promise<void> => {
    // @ts-ignore
    const login: Response = await authService
      .post('/login')
      .send({username: 'paga16', password: 'passwordprova'})
    expect(login.body).toHaveProperty("accessToken")
    expect(login.body).toHaveProperty("refreshToken")
    expect(login.body.accessToken.length).toBeGreaterThan(1)
    expect(login.body.refreshToken.length).toBeGreaterThan(1)
    expect(login.status).toBe(HttpStatusCode.OK)
    expect(login.type).toBe('application/json')

  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  });
})
