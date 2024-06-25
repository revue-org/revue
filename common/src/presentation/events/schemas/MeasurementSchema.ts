import { z, ZodType } from 'zod'
import { Measurement } from '../../../domain/core'
import { MeasureType } from '../../../domain/core/MeasureType.js'
import { MeasureUnit } from '../../../domain/core/MeasureUnit.js'

export const measurementSchema: ZodType<Measurement> = z.object({
  id: z.object({
    value: z.string()
  }),
  type: z.literal('measurement'),
  sourceDeviceId: z.string(),
  timestamp: z.date(),
  measure: z.object({
    type: z.nativeEnum(MeasureType),
    unit: z.nativeEnum(MeasureUnit)
  }),
  value: z.object({
    value: z.any()
  })
})
