import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock, populateLocations } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('GET /', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateLocations()
  })

  describe('GET /', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const locations: Response = await locationService.get('/')
      expect(locations.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('responds with the locations otherwise', async (): Promise<void> => {
      // @ts-ignore
      const sensors: Response = await locationService.get('/').set('Authorization', `Bearer ${TOKEN}`)
      expect(sensors.status).toBe(HttpStatusCode.OK)
      expect(sensors.type).toBe('application/json')
    })
  })

  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
