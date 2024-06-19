import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock, populateSecurityRules } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('GET /rules', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateSecurityRules()
  })
  describe('GET /rules/ranges', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const securityRules: Response = await alarmService.get('/rules/ranges')
      expect(securityRules.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('responds with the exceeding security rules otherwise', async (): Promise<void> => {
      // @ts-ignore
      const securityRules: Response = await alarmService
        .get('/rules/ranges')
        .set('Authorization', `Bearer ${TOKEN}`)
      expect(securityRules.status).toBe(HttpStatusCode.OK)
      expect(securityRules.type).toBe('application/json')
    })
  })

  describe('GET /rules/intrusions', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const securityRules: Response = await alarmService.get('/rules/intrusions')
      expect(securityRules.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('responds with the intrusion security rules otherwise', async (): Promise<void> => {
      // @ts-ignore
      const securityRules: Response = await alarmService
        .get('/rules/intrusions')
        .set('Authorization', `Bearer ${TOKEN}`)
      expect(securityRules.status).toBe(HttpStatusCode.OK)
      expect(securityRules.type).toBe('application/json')
    })
  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
