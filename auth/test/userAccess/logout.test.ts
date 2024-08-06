import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock, populateUsers } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@common/utils/HttpStatusCode.js'

describe('POST /logout/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateUsers()
  })

  it('responds with a OK http status code', async (): Promise<void> => {
    // @ts-ignore
    const login: Response = await authService
      .post('/login')
      .send({ username: 'test-username', password: 'test' })

    console.log(login.body)

    // @ts-ignore
    const logout: Response = await authService
      .post('/logout')
      .set('Authorization', `Bearer ${login.body.accessToken}`)
      .send({ username: 'test-username' })
    expect(logout.status).toBe(HttpStatusCode.OK)
  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
