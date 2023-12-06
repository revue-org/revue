import { MonitoringRoom } from '../MonitoringRoom'
import { Device } from '../../../device/core/Device'
import { DeviceId } from '../../../device/core/DeviceId'
import { Anomaly } from '../../../anomaly/core/Anomaly'

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
