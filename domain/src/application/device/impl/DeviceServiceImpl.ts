import { DeviceService } from '../DeviceService.js'
import { DeviceRepository } from '../../../domain/device/repositories/DeviceRepository.js'
import { Camera} from '../../../domain/device/core/Camera.js'
import { DeviceId } from '../../../domain/device/core/DeviceId.js'
import { Device } from '../../../domain/device/core/Device.js'
import { Sensor } from '../../../domain/device/core/Sensor.js'

export class DeviceServiceImpl implements DeviceService {
  private deviceRepository: DeviceRepository
  private devices: Device[] = []

  constructor(deviceRepository: DeviceRepository) {
    this.deviceRepository = deviceRepository
  }

  deleteCamera(code: string): void {
    this.deviceRepository.deleteCamera(code).then((): void => {
      this.devices = this.devices.filter((device: Device): boolean => device.deviceId.code !== code)
    })
  }

  deleteSensor(code: string): void {
    this.deviceRepository.deleteSensor(code).then((): void => {
      this.devices = this.devices.filter((device: Device): boolean => device.deviceId.code !== code)
    })
  }

  getCameraByCode(code: string): Promise<Camera> {
    return this.deviceRepository.getCameraByCode(code)
  }

  getCameras(): Promise<Camera[]> {
    return this.deviceRepository.getCameras()
  }

  getCapturingDevices(): Promise<Device[]> {
    return this.deviceRepository.getCapturingDevices()
  }

  getDeviceById(deviceId: DeviceId): Promise<Device> {
    return this.deviceRepository.getDeviceById(deviceId)
  }

  getDevices(): Promise<Device[]> {
    return this.deviceRepository.getDevices()
  }

  getSensorByCode(code: string): Promise<Sensor> {
    return this.deviceRepository.getSensorByCode(code)
  }

  getSensors(): Promise<Sensor[]> {
    return this.deviceRepository.getSensors()
  }

  insertCamera(camera: Camera): void {
    this.deviceRepository.insertCamera(camera).then((): void => {
      this.devices.push(camera)
    })
  }

  insertSensor(sensor: Sensor): void {
    this.deviceRepository.insertSensor(sensor).then((): void => {
      this.devices.push(sensor)
    })
  }

  updateCamera(camera: Camera): void {
    this.deviceRepository.updateCamera(camera).then((): void => {
      this.devices = this.devices.map(
        (device: Device): Device => (device.deviceId.code === camera.deviceId.code ? camera : device)
      )
    })
  }

  updateSensor(sensor: Sensor): void {
    this.deviceRepository.updateSensor(sensor).then((): void => {
      this.devices = this.devices.map(
        (device: Device): Device => (device.deviceId.code === sensor.deviceId.code ? sensor : device)
      )
    })
  }
}
