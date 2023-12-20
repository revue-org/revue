import { DeviceId } from '../../core/DeviceId.js'
import { DeviceIdFactory } from '../DeviceIdFactory'
import { DeviceIdImpl } from '../../core/impl/DeviceIdImpl'
import { DeviceType } from '../../core/impl/enum/DeviceType'

export class DeviceIdFactoryImpl implements DeviceIdFactory {
  createCameraId(code: string): DeviceId {
    return new DeviceIdImpl(DeviceType.CAMERA, code)
  }

  createSensorId(code: string): DeviceId {
    return new DeviceIdImpl(DeviceType.SENSOR, code)
  }
}
