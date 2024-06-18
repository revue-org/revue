import supertest from 'supertest'
import { app } from '../src/index.js'

const device = supertest(app)
// @ts-ignore
globalThis.deviceService = device
