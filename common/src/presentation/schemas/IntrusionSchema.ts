import { z, ZodType } from 'zod'
import { Intrusion } from '../../domain/core'
import { domainEventSchema } from './DomainEventSchema'
import { detectionSchema } from './DetectionSchema'

export const intrusionSchema: ZodType<Intrusion> = domainEventSchema.extend({
  type: z.literal('intrusion'),
  detection: detectionSchema,
  intrusionRuleId: z.string()
})
