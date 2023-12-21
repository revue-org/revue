import { DeviceId } from '../../core/DeviceId.js'
import { DeviceIdFactory } from '../DeviceIdFactory.js'
import { DeviceIdImpl } from '../../core/impl/DeviceIdImpl.js'
import { DeviceType } from '../../core/impl/enum/DeviceType.js'

export class DeviceIdFactoryImpl implements DeviceIdFactory {

  createId(type:DeviceType, code: string): DeviceId {
    return new DeviceIdImpl(type, code)
  }

  createCameraId(code: string): DeviceId {
    return new DeviceIdImpl(DeviceType.CAMERA, code)
  }

  createSensorId(code: string): DeviceId {
    return new DeviceIdImpl(DeviceType.SENSOR, code)
  }
}
