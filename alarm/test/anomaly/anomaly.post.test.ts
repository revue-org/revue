import { describe, expect, it, Response, TOKEN } from '../common'
import HttpStatusCode from '../../src/utils/HttpStatusCode.js'

describe('POST /anomalies/intrusions', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    // @ts-ignore
    const creation: Response = await alarm.post('/anomalies/intrusions')
    expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
  }, 100000)

  it('should create a new intrusion', async (): Promise<void> => {
    const newIntrusion = {
      deviceId: {
        type: 'CAMERA',
        code: 'cam-03'
      },
      intrusionObject: 'ANIMAL'
    }

    // @ts-ignore
    const creation: Response = await alarm
      .post('/anomalies/intrusions')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(newIntrusion)

    expect(creation.status).toBe(HttpStatusCode.CREATED)
    expect(creation.type).toBe('application/json')
  }, 100000)
}, 100000)

describe('POST /anomalies/exceedings', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    // @ts-ignore
    const creation: Response = await alarm.post('/anomalies/exceedings')
    expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
  }, 100000)

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
    const creation: Response = await alarm
      .post('/anomalies/exceedings')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(newExceeding)

    expect(creation.status).toBe(HttpStatusCode.CREATED)
    expect(creation.type).toBe('application/json')
  }, 100000)
}, 100000)
