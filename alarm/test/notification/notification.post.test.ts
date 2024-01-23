import { describe, expect, it } from 'vitest'
import { Response } from 'supertest'
import HttpStatusCode from '../../src/utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('POST /notifications/exceedings', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    // @ts-ignore
    const creation: Response = await alarm.post('/notifications/exceedings')
    expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
  }, 100000)

  it('should create a new exceeding notification', async (): Promise<void> => {
    const newExceedingNotification = {
      anomalyId: '65a0fd8acee5858041dce0b6',
      deviceId: {
        type: 'SENSOR',
        code: 'sen-01'
      },
      measure: 'HUMIDITY',
      value: 30
    }

    // @ts-ignore
    const creation: Response = await alarm
      .post('/notifications/exceedings')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(newExceedingNotification)

    expect(creation.status).toBe(HttpStatusCode.CREATED)
    expect(creation.type).toBe('application/json')
  }, 100000)
}, 100000)

describe('POST /notifications/intrusions', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    // @ts-ignore
    const creation: Response = await alarm.post('/notifications/intrusions')
    expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
  }, 100000)

  it('should create a new intrusion notification', async (): Promise<void> => {
    const newIntrusionNotification = {
      anomalyId: '659fc593e4c284c709e2612e',
      deviceId: {
        type: 'CAMERA',
        code: 'cam-01'
      },
      intrusionObject: 'PERSON'
    }
    // @ts-ignore
    const creation: Response = await alarm
      .post('/notifications/intrusions')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(newIntrusionNotification)

    expect(creation.status).toBe(HttpStatusCode.CREATED)
    expect(creation.type).toBe('application/json')
  }, 100000)
}, 100000)
