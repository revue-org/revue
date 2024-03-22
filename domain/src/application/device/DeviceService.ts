import { Camera} from "../../domain/device/core/Camera.js";
import { DeviceId } from "../../domain/device/core/DeviceId.js";
import { Device } from "../../domain/device/core";
import { Sensor } from "../../domain/device/core/Sensor.js";

export interface DeviceService {
  getDevices(): Promise<Device[]>

  getCapturingDevices(): Promise<Device[]>

  getCameras(): Promise<Camera[]>

  getSensors(): Promise<Sensor[]>

  getDeviceById(deviceId: DeviceId): Promise<Device>

  getCameraByCode(code: string): Promise<Camera>

  getSensorByCode(code: string): Promise<Sensor>

  insertCamera(camera: Camera): void

  insertSensor(sensor: Sensor): void

  updateCamera(camera: Camera): void

  updateSensor(sensor: Sensor): void

  deleteCamera(code: string): void

  deleteSensor(code: string): void
}