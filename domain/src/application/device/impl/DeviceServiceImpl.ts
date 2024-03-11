import { DeviceService } from '../DeviceService'
import { Device } from '../../../domain/device/core/Device.js'
import { DeviceId } from '../../../domain/device/core/DeviceId.js'

export class DeviceServiceImpl implements DeviceService {
  addDevice(device: Device): void {
    throw new Error('Method not implemented.')
  }

  deployDevice(deviceId: DeviceId): void {
    throw new Error('Method not implemented.')
  }

  getAllDevices(): Set<Device> {
    throw new Error('Method not implemented.')
  }

  getDevice(deviceId: DeviceId): Device {
    throw new Error('Method not implemented.')
  }

  removeDevice(deviceId: DeviceId): void {
    throw new Error('Method not implemented.')
  }
}
