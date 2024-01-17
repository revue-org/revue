import { alarmService, Response, describe, expect, it, TOKEN } from '../common'

describe('GET /anomalies/exceedings', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    const intrusions: Response = await alarmService.get('/anomalies/exceedings')
    expect(intrusions.status).toBe(403)
  })

  it('responds with the exceedings otherwise', async (): Promise<void> => {
    const exceedings: Response = await alarmService
      .get('/anomalies/exceedings')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(exceedings.status).toBe(200)
    expect(exceedings.type).toBe('application/json')
  })
})

describe('GET /anomalies/intrusions', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    const intrusions: Response = await alarmService.get('/anomalies/intrusions')
    expect(intrusions.status).toBe(403)
  })

  it('responds with the intrusions otherwise', async (): Promise<void> => {
    const intrusions: Response = await alarmService
      .get('/anomalies/intrusions')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(intrusions.status).toBe(200)
    expect(intrusions.type).toBe('application/json')
  })
})
