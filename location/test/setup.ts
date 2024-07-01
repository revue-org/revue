import supertest from 'supertest'
import { app } from '../src/index.js'

const location = supertest(app)
// @ts-ignore
globalThis.locationService = location
