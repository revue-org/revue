import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('POST /', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
  })
  describe('POST /', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const creation: Response = await locationService.post('/')
      expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('should create a new location', async (): Promise<void> => {
      const newLocation = {
        description: 'test-description',
        address: 'test-address',
        external: true
      }

      // @ts-ignore
      const creation: Response = await locationService
        .post('/locations/buildings')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newLocation)

      expect(creation.status).toBe(HttpStatusCode.CREATED)
      expect(creation.type).toBe('application/json')
    })
  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
