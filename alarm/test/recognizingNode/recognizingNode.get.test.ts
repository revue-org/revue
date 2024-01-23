import { describe, expect, it, Response, TOKEN } from '../common'
import HttpStatusCode from '../../src/utils/HttpStatusCode.js'

describe('GET /recognizing-nodes/', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    // @ts-ignore
    const recognizingNodes: Response = await alarm.get('/recognizing-nodes/')
    expect(recognizingNodes.status).toBe(HttpStatusCode.FORBIDDEN)
  }, 100000)

  it('responds with the recognizing nodes otherwise', async (): Promise<void> => {
    // @ts-ignore
    const recognizingNodes: Response = await alarm
      .get('/recognizing-nodes/')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(recognizingNodes.status).toBe(HttpStatusCode.OK)
    expect(recognizingNodes.type).toBe('application/json')
  }, 100000)
}, 100000)
