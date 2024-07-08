import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock, populateSecurityRules } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'
import { z } from 'zod'
import { ContactType, ObjectClass } from 'common/dist/domain/core'

const TOKEN = process.env.DEV_API_KEY

describe('POST /rules', (): void => {
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
        author: 'test-creator-id',
        activeOn: 'cam-01',
        description: 'This is the description of a range rule',
        validityStart: '2020-01-01',
        validityEnd: '2020-01-02',
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
        rule: {
          minValue: 1,
          maxValue: 10,
          measure: {
            type: 'temperature',
            unit: 'celsius'
          }
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
        author: 'test-user-id',
        activeOn: 'test-device-id',
        description: 'This is the description of an intrusion rule',
        validityStart: '2020-01-01',
        validityEnd: '2020-01-02',
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
        objectClass: 'person',
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
