import { z } from 'zod'
import { domainEventSchema } from './DomainEventSchema'

export const deviceEventSchema = domainEventSchema.extend({
  sourceDeviceId: z.string()
})
