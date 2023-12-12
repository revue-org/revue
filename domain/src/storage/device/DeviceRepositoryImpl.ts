import { DeviceRepository } from '../../domain/device/repositories/DeviceRepository'
import { Model } from 'mongoose'
import { CameraImpl } from '../../domain/device/core/impl/CameraImpl'
import { SensorImpl } from '../../domain/device/core/impl/SensorImpl'
import { DeviceId } from '../../domain/device/core/DeviceId'
import { DeviceType } from '../../domain/device/core/impl/enum/DeviceType'
import { Device } from '../../domain/device/core/Device'
import { cameraSchema } from './schemas/CameraSchema'
import { Camera } from '../../domain/device/core/Camera'
import { Sensor } from '../../domain/device/core/Sensor'
import { DeviceTypeConverter } from '../../utils/DeviceTypeConverter'

export class DeviceRepositoryImpl implements DeviceRepository {
  cameraModel: Model<Camera>
  sensorModel: Model<Sensor>

  constructor(cameraModel: Model<Camera>, sensorModel: Model<Sensor>) {
    this.cameraModel = cameraModel
    this.sensorModel = sensorModel
  }

  getCameras(): Promise<Array<Camera>> {
    return this.cameraModel.find()
  }

  getSensors(): Promise<Array<Sensor>> {
    return this.sensorModel.find()
  }

  async getDevice(deviceId: DeviceId): Promise<Camera | Sensor> {
    switch (deviceId.type) {
      case DeviceType.CAMERA:
        return (await this.cameraModel.findOne(deviceId)) as unknown as Camera
      case DeviceType.SENSOR:
        return (await this.sensorModel.findById(deviceId)) as unknown as Sensor
    }
  }

  async insertDevice(device: Device): Promise<void> {
    switch (device.deviceId.type) {
      case DeviceType.CAMERA:
        await this.cameraModel.create({
          _id: {
            type: DeviceTypeConverter.convertToString(device.deviceId.type),
            code: device.deviceId.code
          },
          ipAddress: device.ipAddress,
          resolution: {
            height: (device as Camera).resolution.height,
            width: (device as Camera).resolution.width
          }
        })
        break
      case DeviceType.SENSOR:
        await this.sensorModel.create({
          _id: {
            type: DeviceTypeConverter.convertToString(device.deviceId.type),
            code: device.deviceId.code
          },
          ipAddress: device.ipAddress,
          intervalMillis: (device as Sensor).intervalMillis,
          measures: (device as Sensor).measures
        })
        break
    }
  }

  async deleteDevice(deviceId: DeviceId): Promise<void> {
    switch (deviceId.type) {
      case DeviceType.CAMERA:
        await this.cameraModel.findByIdAndDelete(deviceId)
        break
      case DeviceType.SENSOR:
        await this.sensorModel.findByIdAndDelete(deviceId)
        break
    }
    throw new Error('Device not found')
  }
}
