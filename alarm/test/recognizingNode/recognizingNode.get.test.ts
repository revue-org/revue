import { alarmService, Response, describe, expect, it, TOKEN } from '../common'


describe('GET /recognizingNodes/', (): void => {
  it('responds with a forbidden status if not authorized', async (): Promise<void> => {
    const recognizingNodes: Response = await alarmService.get('/recognizingNodes/')
    expect(recognizingNodes.status).toBe(403)
  })

  it('responds with the recognizing nodes otherwise', async (): Promise<void> => {
    const recognizingNodes: Response = await alarmService
      .get('/recognizingNodes/')
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(recognizingNodes.status).toBe(200)
    expect(recognizingNodes.type).toBe('application/json')
  })
})

