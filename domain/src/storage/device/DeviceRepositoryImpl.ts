import { DeviceRepository } from '../../domain/device/repositories/DeviceRepository.js'
import { Model } from 'mongoose'
import { DeviceId } from '../../domain/device/core/DeviceId.js'
import { DeviceType } from '../../domain/device/core/impl/enum/DeviceType.js'
import { Device } from '../../domain/device/core/Device.js'
import { Camera } from '../../domain/device/core/Camera.js'
import { Sensor } from '../../domain/device/core/Sensor.js'
import { DeviceTypeConverter } from '../../utils/DeviceTypeConverter.js'

export class DeviceRepositoryImpl implements DeviceRepository {
  cameraModel: Model<Camera>
  sensorModel: Model<Sensor>

  constructor(cameraModel: Model<Camera>, sensorModel: Model<Sensor>) {
    this.cameraModel = cameraModel
    this.sensorModel = sensorModel
  }

  async getCameras(): Promise<Camera[]> {
    return this.cameraModel.find()
  }

  async getSensors(): Promise<Sensor[]> {
    return this.sensorModel.find()
  }

  async getDeviceById(deviceId: DeviceId): Promise<Camera | Sensor> {
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

  async updateDevice(device: Device): Promise<void> {
    console.log(device)
    switch (device.deviceId.type) {
      case DeviceType.CAMERA:
        await this.cameraModel
          .findByIdAndUpdate(
            {
              type: DeviceTypeConverter.convertToString(device.deviceId.type),
              code: device.deviceId.code
            },
            {
              ipAddress: device.ipAddress,
              resolution: {
                height: (device as Camera).resolution.height,
                width: (device as Camera).resolution.width
              }
            }
          )
          .orFail()
        break
      case DeviceType.SENSOR:
        await this.sensorModel
          .findByIdAndUpdate(
            {
              type: DeviceTypeConverter.convertToString(device.deviceId.type),
              code: device.deviceId.code
            },
            {
              ipAddress: device.ipAddress,
              intervalMillis: (device as Sensor).intervalMillis,
              measures: (device as Sensor).measures
            }
          )
          .orFail()
        break
    }
  }

  async deleteDevice(deviceId: DeviceId, type: DeviceType): Promise<void> {
    //TODO TO CHECK AND TRY
    switch (type) {
      case DeviceType.CAMERA:
        await this.cameraModel.findByIdAndDelete({
          type: DeviceTypeConverter.convertToString(deviceId.type),
          code: deviceId.code
        })
        break
      case DeviceType.SENSOR:
        await this.sensorModel.findByIdAndDelete({
          type: DeviceTypeConverter.convertToString(deviceId.type),
          code: deviceId.code
        })
        break
    }
  }
}
