import { Response } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { connectToMock, disconnectFromMock, populateUsers } from "../storage/MongoDBMock.js";
import HttpStatusCode from '@utils/HttpStatusCode.js'

const TOKEN = process.env.DEV_API_KEY

describe('POST /users/', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
    await populateUsers()
  })
  it('responds with a forbidden status if no auth token is provided', async (): Promise<void> => {
    // @ts-ignore
    const creation: Response = await authService.post('/users/')
    expect(creation.status).toBe(HttpStatusCode.FORBIDDEN)
  })

  it('should create a new user', async (): Promise<void> => {
    const newUser = {
      name: "Alberto",
      surname: "Paga",
      username: "differentUsernameFromTheOthers",
      password: "passwordprova",
      token: "",
      refreshToken: "",
      contacts: [
        {
          _id: "65841da0306d94b61b329571",
          value: "3333333333",
          type: "SMS"
        }
      ],
      deviceIds: [
        {
          _id: "65841da0306d94b61b329572",
          type: "CAMERA",
          code: "cam-01"
        },
        {
          _id: "65841da0306d94b61b329573",
          type: "SENSOR",
          code: "sen-01"
        }
      ]
    }

    // @ts-ignore
    const creation: Response = await authService
      .post('/users/')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(newUser)

    expect(creation.status).toBe(HttpStatusCode.CREATED)
    expect(creation.type).toBe('application/json')
  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  });
})
