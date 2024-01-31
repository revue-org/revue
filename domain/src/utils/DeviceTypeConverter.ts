import { DeviceType } from '../domain/device/core/impl/enum/DeviceType.js'

export class DeviceTypeConverter {
  static convertToDeviceType(type: string): DeviceType {
    switch (type.toUpperCase()) {
      case 'CAMERA':
        return DeviceType.CAMERA
      case 'SENSOR':
        return DeviceType.SENSOR
      default:
        throw new Error('Device type not found')
    }
  }

  static convertToString(type: DeviceType): string {
    switch (type) {
      case DeviceType.CAMERA:
        return 'CAMERA'
      case DeviceType.SENSOR:
        return 'SENSOR'
      default:
        throw new Error('Device type not found')
    }
  }
}
