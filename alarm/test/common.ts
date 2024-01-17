import supertest from 'supertest'
import { app } from '../src/index.js'

export { describe, expect, it } from 'vitest'
export { Request, Response } from 'supertest'
export const alarmService = supertest(app)
export const TOKEN = process.env.DEV_API_KEY
