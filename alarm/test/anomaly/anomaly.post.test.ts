import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { connectToMock, disconnectFromMock, populateAnomalies } from "../storage/MongoDBMock.js";
import HttpStatusCode from '../../src/utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('POST /anomalies/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateAnomalies()
  })
  describe('POST /anomalies/intrusions', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const creation: Response = await alarmService.post('/anomalies/intrusions')
      expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('should create a new intrusion', async (): Promise<void> => {
      const newIntrusion = {
        deviceId: {
          type: 'CAMERA',
          code: 'cam-03'
        },
        intrusionObject: 'ANIMAL'
      }

      // @ts-ignore
      const creation: Response = await alarmService
        .post('/anomalies/intrusions')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newIntrusion)

      expect(creation.status).toBe(HttpStatusCode.CREATED)
      expect(creation.type).toBe('application/json')
    })
  })

  describe('POST /anomalies/exceedings', (): void => {
    it('responds with a forbidden status if not authorized', async (): Promise<void> => {
      // @ts-ignore
      const creation: Response = await alarmService.post('/anomalies/exceedings')
      expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('should create a new exceeding', async (): Promise<void> => {
      const newExceeding = {
        deviceId: {
          type: 'SENSOR',
          code: 'sen-01'
        },
        measure: 'PRESSURE',
        value: 30
      }

      // @ts-ignore
      const creation: Response = await alarmService
        .post('/anomalies/exceedings')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newExceeding)

      expect(creation.status).toBe(HttpStatusCode.CREATED)
      expect(creation.type).toBe('application/json')
    })
  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  });
})
