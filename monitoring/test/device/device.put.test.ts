import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

const TOKEN: string = process.env.DEV_API_KEY

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
      const newSensor = {
        code: 'sen-100',
        ipAddress: '192.168.1.1',
        intervalMillis: 2000,
        measures: ['TEMPERATURE', 'PRESSURE']
      }

      // @ts-ignore
      await monitoringService.post('/devices/sensors').set('Authorization', `Bearer ${TOKEN}`).send(newSensor)

      const updatedSensor = {
        code: 'sen-100',
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
        code: 'cam-100',
        ipAddress: '192.168.1.1',
        isCapturing: true,
        resolution: {
          width: 200,
          height: 200
        }
      }
      // @ts-ignore
      await monitoringService.post('/devices/cameras').set('Authorization', `Bearer ${TOKEN}`).send(newCamera)

      const updatedCamera = {
        code: 'cam-100',
        ipAddress: '192.168.1.1',
        isCapturing: true,
        resolution: {
          width: 300,
          height: 300
        }
      }

      // @ts-ignore
      const update: Response = await monitoringService
        .put('/devices/cameras')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(updatedCamera)

      expect(update.status).toBe(HttpStatusCode.OK)
      expect(update.type).toBe('application/json')
    })
  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
