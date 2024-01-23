import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { connectToMock, disconnectFromMock, populateAnomalies, populateNotifications } from "../storage/MongoDBMock.js";
import HttpStatusCode from '../../src/utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('PUT /anomalies/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateAnomalies()
  })
  describe('PUT /anomalies/intrusions', (): void => {
    it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
      // @ts-ignore
      const creation: Response = await alarmService.put('/anomalies/intrusions')
      expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('should update the intrusion', async (): Promise<void> => {

      // @ts-ignore
      const intrusionRetrieve: Response = await alarmService
        .get('/anomalies/intrusions')
        .set('Authorization', `Bearer ${TOKEN}`)

      const updatedIntrusion = {
        _id: "",
        deviceId: {
          type: 'CAMERA',
          code: 'cam-03'
        },
        intrusionObject: 'ANIMAL'
      }

      for (let i = 0; i < intrusionRetrieve.body.length; i++) {
        if (intrusionRetrieve.body[i].deviceId.type === "CAMERA") {
          updatedIntrusion._id = intrusionRetrieve.body[i]._id
        }
      }
      // @ts-ignore
      const update: Response = await alarmService
        .put('/anomalies/intrusions')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(updatedIntrusion)

      expect(update.type).toBe(update.body)

      expect(update.status).toBe(HttpStatusCode.OK)
      expect(update.type).toBe('application/json')
    })
  })

/*  describe('POST /anomalies/exceedings', (): void => {
    it('responds with a forbidden status if not authorized', async (): Promise<void> => {
      // @ts-ignore
      const creation: Response = await alarmService.post('/anomalies/exceedings')
      expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
    })

    it('should create a new exceeding', async (): Promise<void> => {
      const newExceeding = {
        deviceId: {
          type: 'SENSOR',
          code: 'sen-01'
        },
        measure: 'PRESSURE',
        value: 30
      }

      // @ts-ignore
      const creation: Response = await alarmService
        .post('/anomalies/exceedings')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newExceeding)

      expect(creation.status).toBe(HttpStatusCode.CREATED)
      expect(creation.type).toBe('application/json')
    })
  })*/
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  });
})
