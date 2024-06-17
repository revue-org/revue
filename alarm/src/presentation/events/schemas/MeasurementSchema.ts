import { z } from 'zod'

export const measurementSchema = z.object({
  measurementId: z.object({
    code: z.string()
  }),
  sourceDeviceId: z.object({
    code: z.string()
  }),
  timestamp: z.date(),
  value: z.object({
    measureType: z.object({
      measure: z.string(),
      unit: z.string()
    }),
    value: z.object({
      value: z.any()
    })
  })
})

export const detectionSchema = z.object({
  detectionId: z.object({
    code: z.string()
  }),
  sourceDeviceId: z.object({
    code: z.string()
  }),
  timestamp: z.date(),
  data: z.object({
    objectClass: z.string(),
  })
})
