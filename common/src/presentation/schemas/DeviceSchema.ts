import { z, ZodType } from 'zod'

export type DeviceMessage = {
  id: string
  type: 'addition' | 'removal' // | 'whatyouwant'
  timestamp: Date
  data: {
    additionDeviceId?: string
    removalDeviceId?: string
  }
}

export const deviceSchema: ZodType<DeviceMessage> = z.object({
  id: z.string(),
  type: z.enum(['addition', 'removal']),
  timestamp: z.date(),
  data: z.object({
    additionDeviceId: z.string().optional(),
    removalDeviceId: z.string().optional()
  })
})
