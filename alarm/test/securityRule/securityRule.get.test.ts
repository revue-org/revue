import { alarmService, Response, describe, expect, it, TOKEN } from '../common'


describe('GET /securityRules/exceedings', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    const securityRules: Response = await alarmService.get('/securityRules/exceedings')
    expect(securityRules.status).toBe(403)
  })

  it('responds with the exceeding security rules otherwise', async (): Promise<void> => {
    const securityRules: Response = await alarmService
      .get('/securityRules/exceedings')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(securityRules.status).toBe(200)
    expect(securityRules.type).toBe('application/json')
  })
})

describe('GET /securityRules/intrusions', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    const securityRules: Response = await alarmService.get('/securityRules/intrusions')
    expect(securityRules.status).toBe(403)
  })

  it('responds with the intrusion security rules otherwise', async (): Promise<void> => {
    const securityRules: Response = await alarmService
      .get('/securityRules/intrusions')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(securityRules.status).toBe(200)
    expect(securityRules.type).toBe('application/json')
  })
})

