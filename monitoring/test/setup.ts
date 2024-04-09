import supertest from 'supertest'
import { app } from '../src/index.js'

const monitoring = supertest(app)
// @ts-ignore
globalThis.monitoringService = monitoring
