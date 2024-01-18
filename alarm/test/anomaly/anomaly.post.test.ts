/*
import { alarmService, describe, expect, it, Response, TOKEN } from '../common'

describe('POST /anomalies/intrusions', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    const creation: Response = await alarmService.post('/anomalies/intrusions')
    expect(creation.status).toBe(403)
  })

  it('should create a new intrusion', async (): Promise<void> => {
    const newIntrusion = {
      deviceId: {
        type: 'CAMERA',
        code: 'cam-03'
      },
      intrusionObject: 'ANIMAL'
    }

    const creation: Response = await alarmService
      .post('/anomalies/intrusions')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(newIntrusion)

    expect(creation.status).toBe(201)
    expect(creation.type).toBe('application/json')
  })
})

describe('POST /anomalies/exceedings', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    const creation: Response = await alarmService.post('/anomalies/exceedings')
    expect(creation.status).toBe(403)
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

    const creation: Response = await alarmService
      .post('/anomalies/exceedings')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(newExceeding)

    expect(creation.status).toBe(201)
    expect(creation.type).toBe('application/json')
  })
})
*/
