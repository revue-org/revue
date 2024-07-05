import { z } from 'zod'
import { domainEventSchema } from './DomainEventSchema.js'

export const deviceEventSchema = domainEventSchema.extend({
  sourceDeviceId: z.string()
})
