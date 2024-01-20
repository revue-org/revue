import { describe, expect, it } from 'vitest'
import { Response } from 'supertest'
import { alarmService } from '../common'

const TOKEN = process.env.DEV_API_KEY

describe('POST /notifications/exceedings', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    const creation: Response = await alarmService.post('/notifications/exceedings')
    expect(creation.status).toBe(403)
  })

  it('should create a new exceeding notification', async (): Promise<void> => {
    const newExceedingNotification = {
      anomalyId: "65a0fd8acee5858041dce0b6",
      deviceId: {
        type: "SENSOR",
        code: "sen-01"
      },
      measure: "HUMIDITY",
      value: 30
    }

    const creation: Response = await alarmService
      .post('/notifications/exceedings')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(newExceedingNotification)

    expect(creation.status).toBe(201)
    expect(creation.type).toBe('application/json')
  })
})

describe('POST /notifications/intrusions', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    const creation: Response = await alarmService.post('/notifications/intrusions')
    expect(creation.status).toBe(403)
  })

  it('should create a new intrusion notification', async (): Promise<void> => {
    const newIntrusionNotification = {
      anomalyId: "659fc593e4c284c709e2612e",
      deviceId: {
        type: "CAMERA",
        code: "cam-01"
      },
      intrusionObject: "PERSON"
    }

    const creation: Response = await alarmService
      .post('/notifications/intrusions')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(newIntrusionNotification)

    expect(creation.status).toBe(201)
    expect(creation.type).toBe('application/json')
  })
})
