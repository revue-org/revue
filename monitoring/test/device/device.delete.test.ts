import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('DELETE /devices/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
  })

  describe('DELETE /devices/', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const sensors: Response = await monitoringService.delete('/devices')
      expect(sensors.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('responds with an ok http status code if the sensor is correctly deleted', async (): Promise<void> => {
      const newSensor = {
        code: 'sen-10',
        ipAddress: '192.168.1.1',
        intervalMillis: 2000,
        measures: ['TEMPERATURE', 'PRESSURE']
      }

      // @ts-ignore
      await monitoringService.post('/devices/sensors').set('Authorization', `Bearer ${TOKEN}`).send(newSensor)

      // @ts-ignore
      const deletion: Response = await monitoringService
        .delete('/devices/sensors/sen-10')
        .set('Authorization', `Bearer ${TOKEN}`)
      expect(deletion.status).toBe(HttpStatusCode.OK)
      expect(deletion.type).toBe('application/json')
    })

    it('responds with an ok http status code if the camera is correctly deleted', async (): Promise<void> => {
      const newCamera = {
        code: 'cam-10',
        ipAddress: '192.168.1.1',
        resolution: {
          width: 200,
          height: 200
        }
      }
      // @ts-ignore
      await monitoringService.post('/devices/cameras').set('Authorization', `Bearer ${TOKEN}`).send(newCamera)
      // @ts-ignore
      const deletion: Response = await monitoringService
        .delete('/devices/cameras/cam-10')
        .set('Authorization', `Bearer ${TOKEN}`)
      expect(deletion.status).toBe(HttpStatusCode.OK)
      expect(deletion.type).toBe('application/json')
    })
  })

  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
