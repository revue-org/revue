import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock, populateUsers } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@common/utils/HttpStatusCode.js'

describe('POST /login/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateUsers()
  })

  it('responds with a valid JSON Web Token otherwise', async (): Promise<void> => {
    // @ts-ignore
    const login: Response = await authService
      .post('/login')
      .send({ username: 'test-username', password: 'test' })
    expect(login.status).toBe(HttpStatusCode.OK)
    expect(login.type).toBe('application/json')
    expect(login.body).toHaveProperty('accessToken')
    expect(login.body).toHaveProperty('refreshToken')
    expect(login.body.accessToken.length).toBeGreaterThan(1)
    expect(login.body.refreshToken.length).toBeGreaterThan(1)
  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
