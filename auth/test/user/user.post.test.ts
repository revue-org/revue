import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock, populateUsers } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@common/utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('POST /users/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateUsers()
  })
  it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
    // @ts-ignore
    const creation: Response = await authService.post('/users/')
    expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
  })

  it('should create a new user', async (): Promise<void> => {
    const newUser = {
      id: 'test-id-1',
      username: 'test-username-1',
      password: 'test', // password: test
      refreshToken: '',
      permissions: ['test-permission-1']
    }

    // @ts-ignore
    const creation: Response = await authService
      .post('/users/')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(newUser)

    expect(creation.status).toBe(HttpStatusCode.CREATED)
    expect(creation.type).toBe('application/json')
  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
