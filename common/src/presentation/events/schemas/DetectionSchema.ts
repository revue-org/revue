import { z, ZodType } from 'zod'
import { Detection, ObjectClass } from '../../../domain/core'

export const detectionSchema: ZodType<Detection> = z.object({
  id: z.object({
    value: z.string()
  }),
  type: z.literal('detection'),
  sourceDeviceId: z.string(),
  timestamp: z.date(),
  objectClass: z.nativeEnum(ObjectClass)
})
