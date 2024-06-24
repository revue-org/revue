import { DeviceAdded } from '@common/domain/core/DeviceAdded.js'
import { DeviceRemoved } from '@common/domain/core/DeviceRemoved.js'

export interface DeviceEventsHub {
  publishDeviceAdded(addition: DeviceAdded): void
  publishDeviceRemoved(removal: DeviceRemoved): void
}
