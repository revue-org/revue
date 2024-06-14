import { z } from 'zod'

export const anomalySchema = z.object({
  anomalyId: z.object({
    code: z.string()
  }),
  timestamp: z.date(),
  data: z.object({})
})
