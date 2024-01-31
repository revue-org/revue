import { DeviceId } from '../core/DeviceId.js'
import { Sensor } from '../core/Sensor.js'
import { Camera } from '../core/Camera.js'
import { Device } from '../core'

export interface DeviceRepository {
  getDevices(): Promise<Device[]>

  getCameras(): Promise<Camera[]>

  getSensors(): Promise<Sensor[]>

  getDeviceById(deviceId: DeviceId): Promise<Device>

  getCameraByCode(code: string): Promise<Camera>

  getSensorByCode(code: string): Promise<Sensor>

  insertCamera(camera: Camera): Promise<void>

  insertSensor(sensor: Sensor): Promise<void>

  updateCamera(camera: Camera): Promise<void>

  updateSensor(sensor: Sensor): Promise<void>

  deleteCamera(code: string): Promise<void>

  deleteSensor(code: string): Promise<void>
}
