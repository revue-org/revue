import { Sensor } from '../core/Sensor'
import { Camera } from '../core/Camera'

export interface DeviceFactory {
  createSensor(): Sensor

  createCamera(): Camera
}
