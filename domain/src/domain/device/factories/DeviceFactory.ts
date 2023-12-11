import { Device } from '../core/Device'
import { Sensor } from '../core/Sensor'
import { Camera } from '../core/Camera'
import { DeviceId } from '../core/DeviceId'
import { Resolution } from '../core/Resolution'
import { Measure } from '../core/impl/enum/Measure'

export interface DeviceFactory {
  createCamera(deviceId: DeviceId, ipAddress: string, resolution: Resolution): Camera

  createSensor(
    deviceId: DeviceId,
    ipAddress: string,
    intervalMillis: number,
    measures: Set<Measure>
  ): Sensor
}
