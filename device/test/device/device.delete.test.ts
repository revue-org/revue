import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connectToMock, disconnectFromMock } from '../storage/MongoDBMock.js'
import HttpStatusCode from '@utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('DELETE /devices', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
  })

  describe('DELETE /devices', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const sensors: Response = await deviceService.delete('/devices')
      expect(sensors.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('responds with an ok http status code if the device is correctly deleted', async (): Promise<void> => {
      // @ts-ignore
      const deletion: Response = await deviceService
        .delete('/devices/test-device-id-1')
        .set('Authorization', `Bearer ${TOKEN}`)
      expect(deletion.status).toBe(HttpStatusCode.OK)
      expect(deletion.type).toBe('application/json')
    })
  })

  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
