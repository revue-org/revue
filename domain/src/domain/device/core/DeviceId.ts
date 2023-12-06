import { DeviceType } from './DeviceType'

export interface DeviceId {
  get type(): DeviceType

  set type(type: DeviceType)

  get code(): string

  set code(code: string)
}
