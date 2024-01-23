import { describe, expect, it, Response, TOKEN } from '../common'
import HttpStatusCode from '../../src/utils/HttpStatusCode.js'

describe('GET /security-rules/exceedings', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    // @ts-ignore
    const securityRules: Response = await alarm.get('/security-rules/exceedings')
    expect(securityRules.status).toBe(HttpStatusCode.FORBIDDEN)
  })

  it('responds with the exceeding security rules otherwise', async (): Promise<void> => {
    // @ts-ignore
    const securityRules: Response = await alarm
      .get('/security-rules/exceedings')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(securityRules.status).toBe(HttpStatusCode.OK)
    expect(securityRules.type).toBe('application/json')
  }, 100000)
})

describe('GET /security-rules/intrusions', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    // @ts-ignore
    const securityRules: Response = await alarm.get('/security-rules/intrusions')
    expect(securityRules.status).toBe(HttpStatusCode.FORBIDDEN)
  }, 100000)

  it('responds with the intrusion security rules otherwise', async (): Promise<void> => {
    // @ts-ignore
    const securityRules: Response = await alarm
      .get('/security-rules/intrusions')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(securityRules.status).toBe(HttpStatusCode.OK)
    expect(securityRules.type).toBe('application/json')
  }, 100000)
}, 100000)
