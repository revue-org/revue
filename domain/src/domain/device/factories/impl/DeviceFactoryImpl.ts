import { DeviceFactory } from '../DeviceFactory'
import { Device } from '../../core/Device'
import { Sensor } from '../../core/Sensor'
import { Camera } from '../../core/Camera'
import { CameraImpl } from '../../core/impl/CameraImpl'
import { DeviceId } from '../../core/DeviceId'
import { Resolution } from '../../core/Resolution'
import { Measure } from '../../core/impl/enum/Measure'
import { SensorImpl } from "../../core/impl/SensorImpl";

export class DeviceFactoryImpl implements DeviceFactory {
  createCamera(deviceId: DeviceId, ipAddress: string, resolution: Resolution): Camera {
    return new CameraImpl(deviceId, ipAddress, resolution)
  }

  createSensor(
    deviceId: DeviceId,
    ipAddress: string,
    intervalMillis: number,
    measures: Set<Measure>
  ): Sensor {
    return new SensorImpl(deviceId, ipAddress, intervalMillis, measures)
  }
}
