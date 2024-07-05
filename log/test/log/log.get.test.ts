import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock, populateLog } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('GET /anomalies/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateLog()
  })

  describe('GET /anomalies/intrusions', (): void => {

    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const intrusions: Response = await logService.get('/anomalies/intrusions')
      expect(intrusions.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('responds with the intrusions otherwise', async (): Promise<void> => {
      // @ts-ignore
      const intrusions: Response = await logService
        .get('/anomalies/intrusions')
        .set('Authorization', `Bearer ${TOKEN}`)
      expect(intrusions.status).toBe(HttpStatusCode.OK)
      expect(intrusions.type).toBe('application/json')
    })

    it('retrieve the intrusion with the current id', async (): Promise<void> => {
      // @ts-ignore
      const intrusions: Response = await logService
        .get('/anomalies/test-id-1')
        .set('Authorization', `Bearer ${TOKEN}`)
      expect(intrusions.status).toBe(HttpStatusCode.OK)
      expect(intrusions.type).toBe('application/json')
    })

  })

  describe('GET /anomalies/outliers', (): void => {

    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const outliers: Response = await logService.get('/anomalies/outliers')
      expect(outliers.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('responds with the outliers otherwise', async (): Promise<void> => {
      // @ts-ignore
      const outliers: Response = await logService
        .get('/anomalies/outliers')
        .set('Authorization', `Bearer ${TOKEN}`)
      expect(outliers.status).toBe(HttpStatusCode.OK)
      expect(outliers.type).toBe('application/json')
    })

    it('retrieve the outlier with the current id', async (): Promise<void> => {
      // @ts-ignore
      const outliers: Response = await logService
        .get('/anomalies/test-id-2')
        .set('Authorization', `Bearer ${TOKEN}`)
      expect(outliers.status).toBe(HttpStatusCode.OK)
      expect(outliers.type).toBe('application/json')
    })

  })


  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
