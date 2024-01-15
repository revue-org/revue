import { DeviceId } from '../core/DeviceId.js'
import { Sensor } from '../core/Sensor.js'
import { Camera } from '../core/Camera.js'

export interface DeviceRepository {
  getCameras(): Promise<Camera[]>

  getSensors(): Promise<Sensor[]>

  getDeviceById(deviceId: DeviceId): Promise<Camera | Sensor>

  insertCamera(camera: Camera): Promise<void>

  insertSensor(sensor: Sensor): Promise<void>

  updateCamera(camera: Camera): Promise<void>

  updateSensor(sensor: Sensor): Promise<void>

  deleteDevice(deviceId: DeviceId): Promise<void>
}
