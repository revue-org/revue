import { describe, expect, it } from 'vitest'
import { Response } from 'supertest'
import HttpStatusCode from '../../src/utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('GET /notifications/', (): void => {

  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    // @ts-ignore
    const notifications: Response = await alarm.get('/notifications/exceedings')
    expect(notifications.status).toBe(HttpStatusCode.FORBIDDEN)
  }, 100000)

  it('responds with the notifications otherwise', async (): Promise<void> => {
    // @ts-ignore
    const notifications: Response = await alarm
      .get('/notifications/')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(notifications.status).toBe(HttpStatusCode.OK)
    expect(notifications.type).toBe('application/json')
  }, 100000)
}, 100000)

