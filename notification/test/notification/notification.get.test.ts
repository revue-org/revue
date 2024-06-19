import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock, populateNotifications } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('GET /notifications/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateNotifications()
  })

  it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
    // @ts-ignore
    const notifications: Response = await notificationService.get('/notifications/')
    expect(notifications.status).toBe(HttpStatusCode.FORBIDDEN)
  })

  it('responds with the notifications otherwise', async (): Promise<void> => {
    // @ts-ignore
    const notifications: Response = await notificationService
      .get('/notifications/')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(notifications.status).toBe(HttpStatusCode.OK)
    expect(notifications.type).toBe('application/json')
  })

  it('retrieve the notification with the current id', async (): Promise<void> => {
    // @ts-ignore
    const notifications: Response = await notificationService
      .get('/notifications/outlier-test-id')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(notifications.status).toBe(HttpStatusCode.OK)
    expect(notifications.type).toBe('application/json')
  })

  it('responds with the outliers notifications', async (): Promise<void> => {
    // @ts-ignore
    const notifications: Response = await notificationService
      .get('/notifications/types/outlier')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(notifications.status).toBe(HttpStatusCode.OK)
    expect(notifications.type).toBe('application/json')
  })

  it('responds with the intrusion notifications', async (): Promise<void> => {
    // @ts-ignore
    const notifications: Response = await notificationService
      .get('/notifications/types/intrusion')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(notifications.status).toBe(HttpStatusCode.OK)
    expect(notifications.type).toBe('application/json')
  })

  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
