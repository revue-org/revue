import supertest from 'supertest'
import { app } from '../src/index.js'

const user = supertest(app)
// @ts-ignore
globalThis.userService = user
