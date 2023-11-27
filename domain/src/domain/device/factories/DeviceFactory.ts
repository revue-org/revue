import { Device } from '../core/Device'

export interface DeviceFactory {
  createSensor(): Device

  createCamera(): Device
}
