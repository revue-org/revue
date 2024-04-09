import supertest from 'supertest'
import { app } from '../src/index.js'

const alarm = supertest(app)
// @ts-ignore
globalThis.alarmService = alarm
