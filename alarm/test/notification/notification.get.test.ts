/*
import { describe, expect, it } from 'vitest'
import { Response } from 'supertest'
import { alarmService } from '../common'

const TOKEN = process.env.DEV_API_KEY

describe('GET /notifications/', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    const notifications: Response = await alarmService.get('/notifications/exceedings')
    expect(notifications.status).toBe(403)
  })

  it('responds with the notifications otherwise', async (): Promise<void> => {
    const notifications: Response = await alarmService
      .get('/notifications/')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(notifications.status).toBe(200)
    expect(notifications.type).toBe('application/json')
  })
})

*/
