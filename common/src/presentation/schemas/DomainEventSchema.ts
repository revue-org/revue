import { z } from 'zod'

export const domainEventSchema = z.object({
  id: z.object({
    value: z.string()
  }),
  type: z.string(),
  timestamp: z.date()
})
