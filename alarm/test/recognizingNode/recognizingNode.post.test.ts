import { alarmService, Response, describe, expect, it, TOKEN } from '../common'


describe('POST /recognizingNodes/', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    const creation: Response = await alarmService.post('/recognizingNodes/')
    expect(creation.status).toBe(403)
  })

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

    const creation: Response = await alarmService
      .post('/recognizingNodes/')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(newRecognizingNode)

    expect(creation.status).toBe(201)
    expect(creation.type).toBe('application/json')
  })
})
