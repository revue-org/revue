---
sidebar_position: 70
---

# Self-assessment / Validation

To ensure a high-quality product, a series of tests that cover different aspects of the system has been implemented.
The tests have been divided into two main categories: architectural testing and API testing.
Moreover, to ensure also a high-quality code production, Code Quality tools have been integrated into the Continuous Integration pipeline.

## Architectural Testing

To ensure that layers’ dependencies are respected, Dependency Cruiser framework has been exploited.
Essentially, the configured rules check that:
- The Domain layer does not access to any other layer.
- The Application layer can access only the Domain layer.
- Presentation layer can access only Domain and Application layers.

<Summary title="Dependency Cruiser rules">

```javascript
forbidden: [
  {
    name: 'no-unreachable-from-domain',
    comment: 'The domain layer should not depend on any other layer',
    severity: 'error',
    from: {
      path: '^(src/domain)'
    },
    to: {
      pathNot: '^(src/domain)'
    }
  },
  {
    name: 'no-unreachable-from-application',
    comment: 'The application layer should only depend on the domain layer',
    severity: 'error',
    from: {
      path: '^(src/application)'
    },
    to: {
      pathNot: '^(src/domain)|^(src/application)|^(src/utils)'
    }
  },
  {
    name: 'no-unreachable-from-presentation',
    comment: 'The presentation layer should only depend on the domain and application layers',
    severity: 'error',
    from: {
      path: '^(src/presentation)'
    },
    to: {
      pathNot: '^(src/domain)|^(src/application)|^(src/presentation)|^(src/utils)|^(node_modules/zod)'
    }
  }
]
```

</Summary>

## API Testing

API testing has been performed using the Vitest framework.

<Summary title="Example: testing the PUT /devices endpoint">

```javascript
describe('PUT /devices', (): void => {
  beforeAll(async (): Promise<void> => {
    await connectToMock()
  })
  describe('PUT /devices', (): void => {
    it('responds with a forbidden status if no auth token is provided', 
      async (): Promise<void> => {
        const update: Response = await deviceService.put('/devices')
        expect(update.status).toBe(HttpStatusCode.FORBIDDEN)
    })
    it('should update the device', async (): Promise<void> => {
      const newDevice = {
        endpoint: {
          ipAddress: '192.168.1.1',
          port: 1000
        },
        description: 'updated description',
        locationId: 'updated locationId',
        isEnabled: false
      }
      const update: Response = await deviceService
        .put('/devices/test-device-id')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(newDevice)
      expect(update.status).toBe(HttpStatusCode.OK)
      expect(update.type).toBe('application/json')
    })
  })
  afterAll(async (): Promise<void> => {
    await disconnectFromMock()
  })
})
```

</Summary>

To be able to execute the tests,
the database has been mocked using MongoDB Memory Server that allows to run a MongoDB instance in memory.
With this configuration, every integration test is isolated from the others, resetting the database after each test.

<Summary title="Example: connecting to the mock database">

```javascript
export const connectToMock = async (): Promise<void> => {
  mongoMock = await MongoMemoryServer.create()
  await mongoose.connect(mongoMock.getUri(), {
    directConnection: true
  })
}

export const populateUsers = async (): Promise<void> => {
  const userModel: Model<User> = model<User>('User', userSchema, 'user')
  await userModel.create(userSample)
}
```

</Summary>

## Code Quality

Two main tools have been used to ensure the quality of the code produced:
**Prettier** is a code formatter that supports many languages. It enforces a consistent style by parsing code and re-writing it according to the configuration rules.
**ESLint** is a tool that statically analyses code to find suboptimal patterns and errors.

Both tools have been integrated into the Continuous Integration pipeline to keep the high-quality code production.
