import { z, ZodType } from 'zod'
import {Detection, Measurement } from '../../../domain/core'
import { AnomalyType, MeasureType, MeasureUnit, ObjectClass } from '../../../domain/core'
// import { AnomalyType } from '../../../domain/core/AnomalyType.js'
export type AnomalyMessage = {
  id: string
  type: AnomalyType
  timestamp: Date
  data: {
    measurementId?: string
    detectionId?: string
    intrusionRuleId?: string
    rangeRuleId?: string
  }
}

export const anomalySchema: ZodType<AnomalyMessage> = z.object({
  id: z.string(),
  type: z.nativeEnum(AnomalyType),
  timestamp: z.date(),
  data: z.object({
    measurementId: z.string().optional(),
    detectionId: z.string().optional(),
    intrusionRuleId: z.string().optional(),
    rangeRuleId: z.string().optional()
  })
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
