import { DeviceEvent } from './DeviceEvent'

export interface DeviceRemoved extends DeviceEvent {
  readonly type: 'removal'
}
