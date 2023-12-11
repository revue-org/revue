import { DeviceType } from 'domain/dist/domain/device/core/impl/enum/DeviceType'

export class DeviceTypeConverter {
  static convert(type: String): DeviceType {
    switch (type) {
      case 'camera':
        return DeviceType.CAMERA;
      case 'sensor':
        return DeviceType.SENSOR;
      default:
        throw new Error('Device type not found')
    }
  }
}
