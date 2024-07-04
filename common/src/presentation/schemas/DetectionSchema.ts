import { z, ZodType } from 'zod'
import { Detection } from '../../domain/core'
import { ObjectClass } from '../../domain/core/ObjectClass.js'
import { deviceEventSchema } from './DeviceEventSchema'

export const detectionSchema: ZodType<Detection> = deviceEventSchema.extend({
  type: z.literal('detection'),
  objectClass: z.nativeEnum(ObjectClass)
})
