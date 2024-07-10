import { Device } from '@/domain/core/Device'
import { DeviceInsertion, DeviceUpdate } from '@/presentation/api/schemas/DeviceSchemas'

export interface DevicePresenter {
  parse(obj: object): Device

  parseInsertion(obj: object): DeviceInsertion

  parseUpdate(obj: object): DeviceUpdate
}
