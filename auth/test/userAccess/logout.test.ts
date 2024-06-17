/*
import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock, populateUsers } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('POST /logout/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateUsers()
  })

  it('responds with a OK http status code', async (): Promise<void> => {
    // @ts-ignore
    const login: Response = await authService
      .post('/login')
      .send({ username: 'paga16', password: 'passwordprova' })

    // @ts-ignore
    const logout: Response = await authService
      .post('/logout')
      .set('Authorization', `Bearer ${login.body.accessToken}`)
      .send({ username: 'paga16' })
    expect(logout.status).toBe(HttpStatusCode.OK)
  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
*/
