import { afterAll, beforeAll } from 'vitest'
import { DatabaseSimulator } from '../src/utils/storage/DatabaseSimulator.js'
import supertest from 'supertest'
import { app } from '../src/index.js'
import { TOKEN } from './common'

beforeAll(async (): Promise<void> => {
  let service = supertest(app)

  await DatabaseSimulator.simulate().then(async (): Promise<void> => {
    let connString = {
      connectionString: DatabaseSimulator.connectionString()
    }
    await service.post('/conn-string/').set('Authorization', `Bearer ${TOKEN}`).send(connString)
  })
  await DatabaseSimulator.createCollections()
  await DatabaseSimulator.populate()

  // @ts-ignore
  globalThis.alarm = service
}, 250000)

afterAll(async (): Promise<void> => {
  //await DatabaseSimulator.clean()
  //await DatabaseSimulator.destroy()
}, 100000)
