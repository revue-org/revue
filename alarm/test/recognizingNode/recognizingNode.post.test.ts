import { Response, describe, expect, it, TOKEN } from '../common'
import HttpStatusCode from '../../src/utils/HttpStatusCode.js'

describe('POST /recognizing-nodes/', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    // @ts-ignore
    const creation: Response = await alarm.post('/recognizing-nodes/')
    expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
  }, 100000)

  it('should create a new recognizing node', async (): Promise<void> => {
    const newRecognizingNode = {
      ipAddress: "192.168.1.10",
      deviceIds: [
        {
          type: "CAMERA",
          code: "cam-02"
        },
        {
          type: "SENSOR",
          code: "sen-02"
        }
      ]
    }

    // @ts-ignore
    const creation: Response = await alarm
      .post('/recognizing-nodes/')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(newRecognizingNode)

    expect(creation.status).toBe(HttpStatusCode.CREATED)
    expect(creation.type).toBe('application/json')
  }, 100000)
}, 100000)
