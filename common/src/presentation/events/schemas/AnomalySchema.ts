import { z, ZodType } from 'zod'

export type AnomalyMessage = {
  id: string
  type: 'outlier' | 'intrusion'
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
  type: z.enum(['outlier', 'intrusion']),
  timestamp: z.date(),
  data: z.object({
    measurementId: z.string().optional(),
    detectionId: z.string().optional(),
    intrusionRuleId: z.string().optional(),
    rangeRuleId: z.string().optional()
  })
})
