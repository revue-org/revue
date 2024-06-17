/*
import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock, populateUsers } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('POST /newToken/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateUsers()
  })

  it('responds with a valid JSON Web Token otherwise', async (): Promise<void> => {
    // @ts-ignore
    const login: Response = await authService
      .post('/login')
      .send({ username: 'paga16', password: 'passwordprova' })

    // @ts-ignore
    const newToken: Response = await authService
      .post('/newToken')
      .send({ username: 'paga16', refreshToken: login.body.refreshToken })
    expect(newToken.status).toBe(HttpStatusCode.OK)
    expect(newToken.type).toBe('application/json')
    expect(newToken.body).toHaveProperty('accessToken')
    expect(newToken.body.accessToken.length).toBeGreaterThan(1)
  })

  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
*/
