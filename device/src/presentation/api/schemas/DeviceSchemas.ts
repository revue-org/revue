import { z, ZodType } from 'zod'
import { Device } from '@/domain/core/Device'
import { CapabilityType } from '@/domain/core/capabilities/CapabilityType.js'

export const deviceInsertionSchema = z.object({
  description: z.string(),
  endpoint: z.object({
    ipAddress: z.string().min(7).max(15),
    port: z.number().min(0).max(65535),
  }),
  locationId: z.string(),
})

export const deviceUpdateSchema = deviceInsertionSchema.extend({
  isEnabled: z.boolean()
})

export const deviceSchema: ZodType<Device> = deviceUpdateSchema.extend({
  deviceId: z.object({
    value: z.string(),
  }),
  capabilities: z.array(z.object({
    type: z.nativeEnum(CapabilityType),
  })),
})
