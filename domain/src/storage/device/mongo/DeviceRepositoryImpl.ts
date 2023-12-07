import { DeviceRepository } from '../../../domain/device/repositories/DeviceRepository'
import { DeviceId } from '../../../domain/device/core/DeviceId'
import { Device } from '../../../domain/device/core/Device'
import { cameraModel } from './schemas/CameraSchema'
import { DeviceType } from '../../../domain/device/core/impl/enum/DeviceType'
import { sensorModel } from './schemas/SensorSchema'
import { Camera } from '../../../domain/device/core/Camera'

class DeviceRepositoryImpl implements DeviceRepository {
  getAllDevices(): Set<Device> {
    //TODO: to check if this && works
    return this.getCameras() && this.getSensors()
  }

  getCameras(): Set<Device> {
    return cameraModel.find()
  }

  getSensors(): Set<Device> {
    return sensorModel.find()
  }

  getDevice(deviceId: DeviceId): Device {
    switch (deviceId.type) {
      case DeviceType.CAMERA:
        return cameraModel.findById(deviceId)
      case DeviceType.SENSOR:
        return sensorModel.findById(deviceId)
    }
  }

  async insertDevice(device: Device): Promise<void> {
    switch (device.deviceId.type) {
      case DeviceType.CAMERA:
        await new cameraModel(device).save()
        break
      case DeviceType.SENSOR:
        await new sensorModel(device).save()
        break
    }
  }

  async deleteDevice(deviceId: DeviceId): Promise<void> {
    switch (deviceId.type) {
      case DeviceType.CAMERA:
        await cameraModel.findByIdAndDelete(deviceId)
        break
      case DeviceType.SENSOR:
        await sensorModel.findByIdAndDelete(deviceId)
        break
    }
    throw new Error('Device not found')
  }
}
