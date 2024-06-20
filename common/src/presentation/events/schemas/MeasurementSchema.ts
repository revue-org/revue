import { z, ZodType } from 'zod'
import { Measurement, MeasureType, MeasureUnit } from '../../../domain/core'

export const measurementSchema: ZodType<Measurement> = z.object({
  id: z.object({
    value: z.string()
  }),
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
