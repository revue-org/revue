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
  describe('POST /security-rules/exceedings', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const creation: Response = await alarmService.post('/security-rules/exceedings')
      expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('should create a new exceeding security rule', async (): Promise<void> => {
      const newExceedingSecurityRule = {
        deviceId: {
          type: 'SENSOR',
          code: 'sen-01'
        },
        creatorId: '6582b78ee645d6402a3be6e2',
        description: 'descrizione regola di sicurezza',
        min: 0,
        max: 25,
        measure: 'TEMPERATURE',
        from: '2018-01-01T01:00:00.000Z',
        to: '2020-01-01T01:00:00.000Z',
        contacts: [
          {
            value: '3333333333',
            type: 'SMS'
          },
          {
            value: 'email@gmail.com',
            type: 'EMAIL'
          }
        ]
      }

      // @ts-ignore
      const creation: Response = await alarmService
        .post('/security-rules/exceedings')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newExceedingSecurityRule)

      expect(creation.status).toBe(HttpStatusCode.CREATED)
      expect(creation.type).toBe('application/json')
    })
  })

  describe('POST /security-rules/intrusions', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const creation: Response = await alarmService.post('/security-rules/intrusions')
      expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('should create a new intrusion security rule', async (): Promise<void> => {
      const newIntrusionSecurityRule = {
        deviceId: {
          type: 'CAMERA',
          code: 'cam-01'
        },
        creatorId: '6582b78ee645d6402a3be6e2',
        description: 'descrizione regola di sicurezza',
        objectClass: 'PERSON',
        from: '2018-01-01T01:00:00.000Z',
        to: '2020-01-01T01:00:00.000Z',
        contacts: [
          {
            value: '3333333333',
            type: 'SMS'
          },
          {
            value: 'email@gmail.com',
            type: 'EMAIL'
          }
        ]
      }
      // @ts-ignore
      const creation: Response = await alarmService
        .post('/security-rules/intrusions')
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
