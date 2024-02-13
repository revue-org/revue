import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { connectToMock, disconnectFromMock, populateRecognizingNodes } from "../storage/MongoDBMock.js";
import HttpStatusCode from '@utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('GET /recognizing-nodes/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateRecognizingNodes()
  })

  it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
    // @ts-ignore
    const recognizingNodes: Response = await alarmService.get('/recognizing-nodes/')
    expect(recognizingNodes.status).toBe(HttpStatusCode.FORBIDDEN)
  })

  it('responds with the recognizing nodes otherwise', async (): Promise<void> => {
    // @ts-ignore
    const recognizingNodes: Response = await alarmService
      .get('/recognizing-nodes/')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(recognizingNodes.status).toBe(HttpStatusCode.OK)
    expect(recognizingNodes.type).toBe('application/json')
  })

  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  });
})
