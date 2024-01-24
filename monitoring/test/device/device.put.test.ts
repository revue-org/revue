import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock, populateDevices } from '../storage/MongoDBMock.js'
import HttpStatusCode from '../../src/utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('PUT /devices/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
  })
  describe('PUT /devices/sensors', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const update: Response = await monitoringService.put('/devices/sensors')
      expect(update.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('should update the sensor', async (): Promise<void> => {
      const updatedSensor = {
        code: 'sen-01',
        ipAddress: '192.168.1.1',
        intervalMillis: 1000,
        measures: ['TEMPERATURE', 'PRESSURE']
      }

      // @ts-ignore
      const update: Response = await monitoringService
        .put('/devices/sensors')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(updatedSensor)

      expect(update.status).toBe(HttpStatusCode.OK)
      expect(update.type).toBe('application/json')
    })
  })

  describe('PUT /devices/cameras', (): void => {
    it('responds with a forbidden status if not authorized', async (): Promise<void> => {
      // @ts-ignore
      const update: Response = await monitoringService.put('/devices/cameras')
      expect(update.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('should update the camera', async (): Promise<void> => {
      const newCamera = {
        code: 'cam-01',
        ipAddress: '192.168.1.1',
        resolution: {
          width: 300,
          height: 300
        }
      }

      // @ts-ignore
      const update: Response = await monitoringService
        .put('/devices/cameras')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newCamera)

      expect(update.status).toBe(HttpStatusCode.OK)
      expect(update.type).toBe('application/json')
    })
  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
