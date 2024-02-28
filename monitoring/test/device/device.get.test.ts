import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock, populateDevices } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('GET /devices/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateDevices()
  })

  describe('GET /devices/sensors', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const sensors: Response = await monitoringService.get('/devices/sensors')
      expect(sensors.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('responds with the sensors otherwise', async (): Promise<void> => {
      // @ts-ignore
      const sensors: Response = await monitoringService
        .get('/devices/sensors/')
        .set('Authorization', `Bearer ${TOKEN}`)
      expect(sensors.status).toBe(HttpStatusCode.OK)
      expect(sensors.type).toBe('application/json')
    })
  })


  describe('GET /devices/cameras', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const cameras: Response = await monitoringService.get('/devices/cameras')
      expect(cameras.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('responds with the cameras otherwise', async (): Promise<void> => {
      // @ts-ignore
      const cameras: Response = await monitoringService
        .get('/devices/cameras/')
        .set('Authorization', `Bearer ${TOKEN}`)
      expect(cameras.status).toBe(HttpStatusCode.OK)
      expect(cameras.type).toBe('application/json')
    })

  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
