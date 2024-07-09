import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock, populateUsers } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@common/utils/HttpStatusCode.js'

describe('POST /refresh/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateUsers()
  })

  it('responds with a valid JSON Web Token otherwise', async (): Promise<void> => {
    // @ts-ignore
    const login: Response = await authService
      .post('/login')
      .send({ username: 'test-username', password: 'test' })

    // @ts-ignore
    const newToken: Response = await authService
      .post('/refresh')
      .send({ refreshToken: login.body.refreshToken })
    expect(newToken.status).toBe(HttpStatusCode.OK)
    expect(newToken.type).toBe('application/json')
    expect(newToken.body).toHaveProperty('accessToken')
    expect(newToken.body.accessToken.length).toBeGreaterThan(1)
  })

  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
