import { alarmService, describe, expect, it, Response, TOKEN } from '../common'

describe('POST /security-rules/exceedings', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    const creation: Response = await alarmService.post('/security-rules/exceedings')
    expect(creation.status).toBe(403)
  })

  it('should create a new exceeding security rule', async (): Promise<void> => {
    const newExceedingSecurityRule = {
      deviceId: {
        type: 'SENSOR',
        code: 'sen-01'
      },
      creatorId: '6582b78ee645d6402a3be6e2',
      description: 'descrizione regola di sicurezza',
      minValue: 0,
      maxValue: 25,
      measure: 'TEMPERATURE',
      from: '2018-01-01T01:00:00.000Z',
      to: '2020-01-01T01:00:00.000Z',
      contacts: [
        {
          value: '3667161457',
          type: 'SMS'
        },
        {
          value: 'email@gmail.com',
          type: 'EMAIL'
        }
      ]
    }

    const creation: Response = await alarmService
      .post('/security-rules/exceedings')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(newExceedingSecurityRule)

    expect(creation.status).toBe(201)
    expect(creation.type).toBe('application/json')
  })
})

describe('POST /security-rules/intrusions', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    const creation: Response = await alarmService.post('/security-rules/intrusions')
    expect(creation.status).toBe(403)
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
          value: '3667161457',
          type: 'SMS'
        },
        {
          value: 'email@gmail.com',
          type: 'EMAIL'
        }
      ]
    }

    const creation: Response = await alarmService
      .post('/security-rules/intrusions')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(newIntrusionSecurityRule)

    expect(creation.status).toBe(201)
    expect(creation.type).toBe('application/json')
  })
})
