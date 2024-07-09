import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

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

    it('should create a new device', async (): Promise<void> => {
      const newDevice = {
        description: 'test-description-1',
        endpoint: {
          ipAddress: '192.168.1.10',
          port: 6900
        },
        locationId: 'test-location-id-1'
      }

      // @ts-ignore
      const creation: Response = await deviceService
        .post('/devices')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newDevice)

      expect(creation.status).toBe(HttpStatusCode.CREATED)
      expect(creation.type).toBe('application/json')
    })
  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
