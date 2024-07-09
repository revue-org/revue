import { DeviceEvent } from './DeviceEvent'

export interface DeviceAdded extends DeviceEvent {
  readonly type: 'addition'
}
