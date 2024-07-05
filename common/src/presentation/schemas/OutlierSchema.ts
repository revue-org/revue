import { z, ZodType } from 'zod'
import { Outlier } from '../../domain/core'
import { domainEventSchema } from './DomainEventSchema.js'
import { measurementSchema } from './MeasurementSchema.js'

export const outlierSchema: ZodType<Outlier> = domainEventSchema.extend({
  type: z.literal('outlier'),
  measurement: measurementSchema,
  rangeRuleId: z.string()
})
