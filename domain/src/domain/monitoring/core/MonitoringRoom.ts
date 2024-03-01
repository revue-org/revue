import { Anomaly } from '../../alarm-system/core/Anomaly.js'
import { DeviceId } from '../../device/core/DeviceId.js'
import { Device } from '../../device/core/Device.js'

export interface MonitoringRoom {
  registerDevice(device: Device): void

  enableDevice(deviceId: DeviceId): void

  disableDevice(deviceId: DeviceId): void

  createSecurityRule(): void

  deleteSecurityRule(): void

  getDeviceHistory(deviceId: DeviceId): Anomaly[]
}
