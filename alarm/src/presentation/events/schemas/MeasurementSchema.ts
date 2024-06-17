import { z } from 'zod'

export const measurementSchema = z.object({
  measurementId: z.object({
    code: z.string()
  }),
  sourceDeviceId: z.object({
    code: z.string()
  }),
  timestamp: z.date(),
  value: z.object({})
})

export const detectionSchema = z.object({
  detectionId: z.object({
    code: z.string()
  }),
  anomalyId: z.object({
    code: z.string()
  }),
  timestamp: z.date(),
  data: z.object({})
})
