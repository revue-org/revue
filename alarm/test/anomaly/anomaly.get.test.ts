import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { connectToMock, disconnectFromMock, populateAnomalies } from "../storage/MongoDBMock.js";
import HttpStatusCode from '../../src/utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('GET /notifications/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateAnomalies()
  })
  describe('GET /anomalies/exceedings', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const intrusions: Response = await alarmService.get('/anomalies/exceedings')
      expect(intrusions.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('responds with the exceedings otherwise', async (): Promise<void> => {
      // @ts-ignore
      const exceedings: Response = await alarmService
        .get('/anomalies/exceedings')
        .set('Authorization', `Bearer ${TOKEN}`)
      expect(exceedings.status).toBe(HttpStatusCode.OK)
      expect(exceedings.type).toBe('application/json')
    })
  })

  describe('GET /anomalies/intrusions', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const intrusions: Response = await alarmService.get('/anomalies/intrusions')
      expect(intrusions.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('responds with the intrusions otherwise', async (): Promise<void> => {
      // @ts-ignore
      const intrusions: Response = await alarmService
        .get('/anomalies/intrusions')
        .set('Authorization', `Bearer ${TOKEN}`)
      expect(intrusions.status).toBe(HttpStatusCode.OK)
      expect(intrusions.type).toBe('application/json')
    })
  })

  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  });
})
