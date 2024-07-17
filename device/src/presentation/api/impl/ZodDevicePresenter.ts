import { Device } from '@/domain/core/Device.js'
import { DevicePresenter } from '@/presentation/api/DevicePresenter.js'
import { DeviceInsertion, DeviceUpdate } from '@/presentation/api/schemas/DeviceSchemas.js'
import { z, ZodType } from 'zod'
import { CapabilityType } from '@/domain/core/capabilities/CapabilityType.js'

export class ZodDevicePresenter implements DevicePresenter {
  private readonly deviceSchema: ZodType<Device>
  private readonly deviceInsertionSchema
  private readonly deviceUpdateSchema

  constructor() {
    this.deviceInsertionSchema = z.object({
      description: z.string(),
      endpoint: z.object({
        ipAddress: z.string().min(7).max(15),
        port: z.number().min(0).max(65535)
      })
    })
    this.deviceUpdateSchema = this.deviceInsertionSchema.extend({
      isEnabled: z.boolean(),
      locationId: z.string()
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
