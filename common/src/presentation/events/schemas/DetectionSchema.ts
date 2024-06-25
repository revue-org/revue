import { z, ZodType } from 'zod'
import { Detection } from '../../../domain/core'
import { ObjectClass } from '../../../domain/core/ObjectClass.js'

export const detectionSchema: ZodType<Detection> = z.object({
  id: z.object({
    value: z.string()
  }),
  type: z.literal('detection'),
  sourceDeviceId: z.string(),
  timestamp: z.date(),
  objectClass: z.nativeEnum(ObjectClass)
})
