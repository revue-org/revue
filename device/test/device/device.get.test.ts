import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock, populateDevices } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('GET /devices', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateDevices()
  })

  describe('GET /devices', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const devices: Response = await deviceService.get('/devices')
      expect(devices.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('responds with the devices otherwise', async (): Promise<void> => {
      // @ts-ignore
      const sensors: Response = await deviceService.get('/devices').set('Authorization', `Bearer ${TOKEN}`)
      expect(sensors.status).toBe(HttpStatusCode.OK)
      expect(sensors.type).toBe('application/json')
    })
  })

  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
