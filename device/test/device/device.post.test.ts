import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

describe('POST /devices', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
  })
  describe('POST /devices', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const creation: Response = await deviceService.post('/devices')
      expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
    })
  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
