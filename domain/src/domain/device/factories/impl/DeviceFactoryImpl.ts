import { DeviceFactory } from '../DeviceFactory.js'
import { Sensor } from '../../core/Sensor.js'
import { Camera } from '../../core/Camera.js'
import { CameraImpl } from '../../core/impl/CameraImpl.js'
import { DeviceId } from '../../core/DeviceId.js'
import { Resolution } from '../../core/Resolution.js'
import { Measure } from '../../core/impl/enum/Measure.js'
import { SensorImpl } from '../../core/impl/SensorImpl.js'

export class DeviceFactoryImpl implements DeviceFactory {
  createCamera(deviceId: DeviceId, isCapturing: boolean, ipAddress: string, resolution: Resolution): Camera {
    return new CameraImpl(deviceId, isCapturing, ipAddress, resolution)
  }

  createSensor(
    deviceId: DeviceId,
    isCapturing: boolean,
    ipAddress: string,
    intervalMillis: number,
    measures: Measure[]
  ): Sensor {
    return new SensorImpl(deviceId, isCapturing, ipAddress, intervalMillis, measures)
  }
}
