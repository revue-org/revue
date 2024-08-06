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

  it('retrieve the intrusion with the current id', async (): Promise<void> => {
    // @ts-ignore
    const intrusion: Response = await logService
      .get('/anomalies/test-id-1')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(intrusion.status).toBe(HttpStatusCode.OK)
    expect(intrusion.type).toBe('application/json')
    expect(intrusion.body).toStrictEqual({
      id: 'test-id-1',
      data: {
        detectionId: 'test-detection-id',
        intrusionRuleId: 'test-intrusion-rule-id',
        type: 'detection'
      },
      timestamp: '2021-09-01T21:00:00.000Z',
      type: 'intrusion'
    })
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
  })

  describe('GET /measurements', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const measurements: Response = await logService.get('/measurements')
      expect(measurements.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('responds with the measurements otherwise', async (): Promise<void> => {
      // @ts-ignore
      const measurements: Response = await logService
        .get('/measurements')
        .set('Authorization', `Bearer ${TOKEN}`)
      expect(measurements.status).toBe(HttpStatusCode.OK)
      expect(measurements.type).toBe('application/json')
    })

    describe('GET /measurements/:deviceId', (): void => {
      it('responds with the measurements taken by the device specified', async (): Promise<void> => {
        // @ts-ignore
        const measurements: Response = await logService
          .get('/measurements/test-source-device-id')
          .set('Authorization', `Bearer ${TOKEN}`)
        expect(measurements.status).toBe(HttpStatusCode.OK)
        expect(measurements.type).toBe('application/json')
        expect(measurements.body).toStrictEqual([
          {
            id: {
              value: 'test-measurement-id'
            },
            measure: {
              type: 'temperature',
              unit: 'celsius'
            },
            timestamp: '2021-09-01T20:00:00.000Z',
            type: 'measurement',
            sourceDeviceId: 'test-source-device-id',
            value: 10
          }
        ])
      })
    })
  })

  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
