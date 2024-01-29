import { DeviceType } from '../domain/device/core/impl/enum/DeviceType.js'

export class DeviceTypeConverter {
  static convertToDeviceType(type: String): DeviceType {
    console.log(type)
    switch (type.toUpperCase()) {
      case 'CAMERA':
        return DeviceType.CAMERA
      case 'SENSOR':
        return DeviceType.SENSOR
      default:
        throw new Error('Device type not found')
    }
  }

  static convertToString(type: DeviceType): String {
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
