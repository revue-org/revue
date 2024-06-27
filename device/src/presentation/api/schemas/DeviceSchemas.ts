import { z } from 'zod'

export const deviceInsertionSchema = z.object({
  description: z.string(),
  address: z.object({
    ip: z.string().min(7).max(15),
    port: z.number().min(0).max(65535),
  }),
  locationId: z.string(),
})

export const deviceUpdateSchema = deviceInsertionSchema.extend({
  enabled: z.boolean()
})
