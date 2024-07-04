import { z, ZodType } from 'zod'
import { Outlier } from '../../domain/core'
import { domainEventSchema } from './DomainEventSchema'
import { measurementSchema } from './MeasurementSchema'

export const outlierSchema: ZodType<Outlier> = domainEventSchema.extend({
  type: z.literal('outlier'),
  measurement: measurementSchema,
  rangeRuleId: z.string()
})
