import { DeviceService } from '../DeviceService.js'
import { DeviceRepository } from '../../../domain/device/repositories/DeviceRepository.js'
import { Camera } from '../../../domain/device/core/Camera.js'
import { DeviceId } from '../../../domain/device/core/DeviceId.js'
import { Device } from '../../../domain/device/core/Device.js'
import { Sensor } from '../../../domain/device/core/Sensor.js'

export class DeviceServiceImpl implements DeviceService {
  private deviceRepository: DeviceRepository

  constructor(deviceRepository: DeviceRepository) {
    this.deviceRepository = deviceRepository
  }

  deleteCamera(code: string): void {
    this.deviceRepository.deleteCamera(code)
  }

  deleteSensor(code: string): void {
    this.deviceRepository.deleteSensor(code)
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
    this.deviceRepository.insertCamera(camera)
  }

  insertSensor(sensor: Sensor): void {
    this.deviceRepository.insertSensor(sensor)
  }

  updateCamera(camera: Camera): void {
    this.deviceRepository.updateCamera(camera)
  }

  updateSensor(sensor: Sensor): void {
    this.deviceRepository.updateSensor(sensor)
  }
}
