import { describe, expect, it, Response, TOKEN } from '../common'
import HttpStatusCode from '../../src/utils/HttpStatusCode.js'

describe('GET /anomalies/exceedings', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    // @ts-ignore
    const intrusions: Response = await alarm.get('/anomalies/exceedings')
    expect(intrusions.status).toBe(HttpStatusCode.FORBIDDEN)
  })

  it('responds with the exceedings otherwise', async (): Promise<void> => {
    // @ts-ignore
    const exceedings: Response = await alarm
      .get('/anomalies/exceedings')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(exceedings.status).toBe(HttpStatusCode.OK)
    expect(exceedings.type).toBe('application/json')
  })
}, 100000)

describe('GET /anomalies/intrusions', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    // @ts-ignore
    const intrusions: Response = await alarm.get('/anomalies/intrusions')
    expect(intrusions.status).toBe(HttpStatusCode.FORBIDDEN)
  }, 100000)

  it('responds with the intrusions otherwise', async (): Promise<void> => {
    // @ts-ignore
    const intrusions: Response = await alarm
      .get('/anomalies/intrusions')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(intrusions.status).toBe(HttpStatusCode.OK)
    expect(intrusions.type).toBe('application/json')
  }, 100000)
}, 100000)
