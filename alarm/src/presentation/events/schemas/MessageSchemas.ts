import { z, ZodType } from 'zod'
import { AnomalyType, Detection, Measurement, MeasureType, MeasureUnit, ObjectClass } from '@common/domain/core'

export type AnomalyMessage = {
  id: {
    value: string
  }
  type: AnomalyType
  timestamp: Date
  data: any
}

export const anomalySchema: ZodType<AnomalyMessage> = z.object({
  id: z.object({
    value: z.string()
  }),
  type: z.nativeEnum(AnomalyType),
  timestamp: z.date(),
  data: z.object({})
})

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


export const detectionSchema: ZodType<Detection> = z.object({
  id: z.object({
    value: z.string()
  }),
  sourceDeviceId: z.string(),
  timestamp: z.date(),
  objectClass: z.nativeEnum(ObjectClass)
})

