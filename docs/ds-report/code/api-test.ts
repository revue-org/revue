describe('GET /devices/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateDevices()
  })

  describe('GET /devices/sensors', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      const sensors: Response = await monitoringService.get('/devices/sensors')
      expect(sensors.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('responds with the sensors otherwise', async (): Promise<void> => {
      const sensors: Response = await monitoringService
        .get('/devices/sensors/')
        .set('Authorization', `Bearer ${TOKEN}`)
      expect(sensors.status).toBe(HttpStatusCode.OK)
      expect(sensors.type).toBe('application/json')
    })
  })

  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
