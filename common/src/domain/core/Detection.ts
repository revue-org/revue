import { DeviceEvent } from './DeviceEvent'
import { ObjectClass } from './ObjectClass'

export interface Detection extends DeviceEvent {
  readonly objectClass: ObjectClass
}
