import { z, ZodType } from 'zod'
import { Measurement } from '../../domain/core'
import { MeasureType } from '../../domain/core/MeasureType.js'
import { MeasureUnit } from '../../domain/core/MeasureUnit.js'
import { deviceEventSchema } from './DeviceEventSchema'

export const measurementSchema: ZodType<Measurement> = deviceEventSchema.extend({
  type: z.literal('measurement'),
  measure: z.object({
    type: z.nativeEnum(MeasureType),
    unit: z.nativeEnum(MeasureUnit)
  }),
  value: z.number()
})
