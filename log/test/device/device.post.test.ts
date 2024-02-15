import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock } from '../storage/MongoDBMock.js'
import HttpStatusCode from 'domain/dist/utils/HttpStatusCode.js'

const TOKEN: string = process.env.DEV_API_KEY

describe('POST /devices/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
  })
  describe('POST /devices/sensors', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const creation: Response = await monitoringService.post('/devices/sensors')
      expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('should create a new sensor', async (): Promise<void> => {
      const newSensor = {
        code: 'sen-2',
        ipAddress: '192.168.1.1',
        intervalMillis: 2000,
        measures: ['TEMPERATURE', 'PRESSURE']
      }

      // @ts-ignore
      const creation: Response = await monitoringService
        .post('/devices/sensors')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newSensor)

      expect(creation.status).toBe(HttpStatusCode.CREATED)
      expect(creation.type).toBe('application/json')
    })
  })

  describe('POST /devices/cameras', (): void => {
    it('responds with a forbidden status if not authorized', async (): Promise<void> => {
      // @ts-ignore
      const creation: Response = await monitoringService.post('/devices/cameras')
      expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('should create a new camera', async (): Promise<void> => {
      const newCamera = {
        code: "cam-2",
        ipAddress: "192.168.1.1",
        resolution: {
          width: 200,
          height: 200
        }
      }
      // @ts-ignore
      const creation: Response = await monitoringService
        .post('/devices/cameras')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newCamera)

      expect(creation.status).toBe(HttpStatusCode.CREATED)
      expect(creation.type).toBe('application/json')
    })
  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  });
})
