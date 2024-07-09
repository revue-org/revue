import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock, populateLocations } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('PUT /', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateLocations()
  })
  describe('PUT /', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const update: Response = await locationService.put('/locations/buildings/test-location-id')
      expect(update.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('should update the location', async (): Promise<void> => {
      const newLocation = {
        description: 'test-description-1',
        address: 'test-address-1',
        external: true
      }

      // @ts-ignore
      const update: Response = await locationService
        .put('/locations/buildings/test-location-id')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newLocation)

      expect(update.status).toBe(HttpStatusCode.OK)
      expect(update.type).toBe('application/json')
    })
  })

  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
