import { DeviceType } from './impl/enum/DeviceType'

export interface DeviceId {
  get type(): DeviceType

  set type(type: DeviceType)

  get code(): string

  set code(code: string)
}
