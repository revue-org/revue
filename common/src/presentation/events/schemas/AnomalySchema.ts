import { AnomalyType } from '../../../domain/core'
import { z, ZodType } from 'zod'

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
