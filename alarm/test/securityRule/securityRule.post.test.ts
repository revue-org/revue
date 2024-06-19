import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock, populateSecurityRules } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('POST /security-rules', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateSecurityRules()
  })
  describe('POST /rules/ranges', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const creation: Response = await alarmService.post('/rules/ranges')
      expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('should create a new range security rule', async (): Promise<void> => {
      const newRangeRule = {
        id: 'post-range-rule',
        type: 'range',
        creatorId: 'test-creator-id',
        activeOn: 'cam-01',
        description: 'This is the description of a range rule',
        from: '2020-01-01',
        to: '2020-01-02',
        contacts: [
          {
            type: 'sms',
            value: '3556333333'
          },
          {
            type: 'email',
            value: 'testmail@gmail.com'
          }
        ],
        min: 2,
        max: 15,
        measure: {
          type: 'temperature',
          unit: 'celsius'
        },
        enabled: true
      }

      // @ts-ignore
      const creation: Response = await alarmService
        .post('/rules/ranges')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newRangeRule)

      expect(creation.status).toBe(HttpStatusCode.CREATED)
      expect(creation.type).toBe('application/json')
    })
  })

  describe('POST /rules/intrusions', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const creation: Response = await alarmService.post('/rules/intrusions')
      expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('should create a new intrusion security rule', async (): Promise<void> => {
      const newIntrusionSecurityRule = {
        id: 'post-intrusion-rule',
        type: 'intrusion',
        creatorId: 'test-user-id',
        activeOn: 'test-device-id',
        description: 'This is the description of an intrusion rule',
        from: '2020-01-01',
        to: '2020-01-02',
        contacts: [
          {
            type: 'sms',
            value: '33333334353'
          },
          {
            type: 'email',
            value: 'testmail@gmail.com'
          }
        ],
        data: {
          objectClass: 'car'
        },
        enabled: true
      }
      // @ts-ignore
      const creation: Response = await alarmService
        .post('/rules/intrusions')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newIntrusionSecurityRule)

      expect(creation.status).toBe(HttpStatusCode.CREATED)
      expect(creation.type).toBe('application/json')
    })
  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
