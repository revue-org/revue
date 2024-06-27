import { Device } from '@/domain/core/Device'
import { DevicePresenter } from '@/presentation/api/DevicePresenter'
import { DeviceInsertion, DeviceUpdate } from '@/presentation/api/schemas/DeviceSchemas'
import { z } from 'zod'
import { CapabilityType } from '@/domain/core/capabilities/CapabilityType'

export class ZodDevicePresenter implements DevicePresenter {
  private readonly deviceSchema
  private readonly deviceInsertionSchema
  private readonly deviceUpdateSchema

  constructor() {
    this.deviceInsertionSchema = z.object({
      description: z.string(),
      endpoint: z.object({
        ipAddress: z.string().min(7).max(15),
        port: z.number().min(0).max(65535)
      }),
      locationId: z.string()
    })
    this.deviceUpdateSchema = this.deviceInsertionSchema.extend({
      isEnabled: z.boolean()
    })
    this.deviceSchema = this.deviceUpdateSchema.extend({
      deviceId: z.object({
        value: z.string()
      }),
      capabilities: z.array(
        z.object({
          type: z.nativeEnum(CapabilityType)
        })
      )
    })
  }

  parse(obj: object): Device {
    return this.deviceSchema.parse(obj)
  }

  parseInsertion(obj: object): DeviceInsertion {
    return this.deviceInsertionSchema.parse(obj)
  }

  parseUpdate(obj: object): DeviceUpdate {
    return this.deviceUpdateSchema.parse(obj)
  }
}
