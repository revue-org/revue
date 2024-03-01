import { MonitoringRoom } from '../MonitoringRoom.js'
import { Device } from '../../../device/core/Device.js'
import { DeviceId } from '../../../device/core/DeviceId.js'
import { Anomaly } from '../../../alarm-system/core/Anomaly.js'

export class MonitoringRoomImpl implements MonitoringRoom {
  createSecurityRule(): void {
    throw new Error('Method not implemented.')
  }

  deleteSecurityRule(): void {
    throw new Error('Method not implemented.')
  }

  disableDevice(deviceId: DeviceId): void {
    throw new Error('Method not implemented.')
  }

  enableDevice(deviceId: DeviceId): void {
    throw new Error('Method not implemented.')
  }

  getDeviceHistory(deviceId: DeviceId): Anomaly[] {
    throw new Error('Method not implemented.')
  }

  registerDevice(device: Device): void {
    throw new Error('Method not implemented.')
  }
}
