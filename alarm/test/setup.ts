import { afterAll, beforeAll } from 'vitest'
import { DatabaseSimulator } from '../src/utils/storage/DatabaseSimulator.js'
import supertest from 'supertest'
import { app } from '../src/index.js'

beforeAll(async (): Promise<void> => {
  await DatabaseSimulator.simulate()
  await DatabaseSimulator.createCollections()
  await DatabaseSimulator.populate()
  // @ts-ignore
  globalThis.alarmService = supertest(app)
}, 20000)

afterAll(async (): Promise<void> => {
  await DatabaseSimulator.clean()
  await DatabaseSimulator.destroy()
}, 20000)
