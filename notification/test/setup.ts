import supertest from 'supertest'
import { app } from '../src/index.js'

const notification = supertest(app)
// @ts-ignore
globalThis.notificationService = notification
