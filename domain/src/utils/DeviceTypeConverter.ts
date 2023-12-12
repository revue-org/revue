import { DeviceType } from '../domain/device/core/impl/enum/DeviceType'

export class DeviceTypeConverter {
  static convertToDeviceType(type: String): DeviceType {
    switch (type) {
      case 'camera':
        return DeviceType.CAMERA
      case 'sensor':
        return DeviceType.SENSOR
      default:
        throw new Error('Device type not found')
    }
  }

  static convertToString(type: DeviceType): String {
    switch (type) {
      case DeviceType.CAMERA:
        return 'camera'
      case DeviceType.SENSOR:
        return 'sensor'
      default:
        throw new Error('Device type not found')
    }
  }
}
