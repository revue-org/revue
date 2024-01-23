import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { connectToMock, disconnectFromMock, populateRecognizingNodes } from "../storage/MongoDBMock.js";
import HttpStatusCode from '../../src/utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('POST /recognizing-nodes/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateRecognizingNodes()
  })
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    // @ts-ignore
    const creation: Response = await alarmService.post('/recognizing-nodes/')
    expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
  })

  it('should create a new recognizing node', async (): Promise<void> => {
    const newRecognizingNode = {
      ipAddress: '192.168.1.10',
      deviceIds: [
        {
          type: 'CAMERA',
          code: 'cam-02'
        },
        {
          type: 'SENSOR',
          code: 'sen-02'
        }
      ]
    }

    // @ts-ignore
    const creation: Response = await alarmService
      .post('/recognizing-nodes/')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(newRecognizingNode)

    expect(creation.status).toBe(HttpStatusCode.CREATED)
    expect(creation.type).toBe('application/json')
  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  });
})
