import supertest from 'supertest'
import { app } from '../src/index.js'

const auth = supertest(app)
// @ts-ignore
globalThis.authService = auth
