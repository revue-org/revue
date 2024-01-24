import { DeviceRepository } from '../../domain/device/repositories/DeviceRepository.js'
import { Model } from 'mongoose'
import { DeviceId } from '../../domain/device/core/DeviceId.js'
import { DeviceType } from '../../domain/device/core/impl/enum/DeviceType.js'
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
    return this.cameraModel.find().orFail()
  }

  async getSensors(): Promise<Sensor[]> {
    return this.sensorModel.find().orFail()
  }

  async getDeviceById(deviceId: DeviceId): Promise<Camera | Sensor> {
    switch (deviceId.type) {
      case DeviceType.CAMERA:
        return this.cameraModel.findOne({
          _id: {
            type: DeviceTypeConverter.convertToString(deviceId.type),
            code: deviceId.code
          }
        }) as unknown as Camera
      case DeviceType.SENSOR:
        return this.sensorModel.findOne({
          _id: {
            type: DeviceTypeConverter.convertToString(deviceId.type),
            code: deviceId.code
          }
        }) as unknown as Sensor
      default:
        throw new Error('Error while getting device')
    }
  }

  async insertCamera(camera: Camera): Promise<void> {
    await this.cameraModel
      .create({
        _id: {
          type: DeviceTypeConverter.convertToString(camera.deviceId.type),
          code: camera.deviceId.code
        },
        ipAddress: camera.ipAddress,
        resolution: {
          height: camera.resolution.height,
          width: camera.resolution.width
        }
      })
      .catch((err): void => {
        throw err
      })
  }

  async insertSensor(sensor: Sensor): Promise<void> {
    await this.sensorModel
      .create({
        _id: {
          type: DeviceTypeConverter.convertToString(sensor.deviceId.type),
          code: sensor.deviceId.code
        },
        ipAddress: sensor.ipAddress,
        intervalMillis: sensor.intervalMillis,
        measures: sensor.measures
      })
      .catch((err): void => {
        throw err
      })
  }

  async updateCamera(camera: Camera): Promise<void> {
    await this.cameraModel
      .findOneAndUpdate(
        {
          _id: {
            type: DeviceTypeConverter.convertToString(camera.deviceId.type),
            code: camera.deviceId.code
          }
        },
        {
          ipAddress: camera.ipAddress,
          resolution: {
            height: camera.resolution.height,
            width: camera.resolution.width
          }
        }
      )
      .orFail()
  }

  async updateSensor(sensor: Sensor): Promise<void> {
    await this.sensorModel
      .findOneAndUpdate(
        {
          _id: {
            type: DeviceTypeConverter.convertToString(sensor.deviceId.type),
            code: sensor.deviceId.code
          }
        },
        {
          ipAddress: sensor.ipAddress,
          intervalMillis: sensor.intervalMillis,
          measures: sensor.measures
        }
      )
      .orFail()
  }

  async deleteDevice(deviceId: DeviceId): Promise<void> {
    switch (deviceId.type) {
      case DeviceType.CAMERA:
        await this.cameraModel
          .deleteOne({
            _id: {
              type: DeviceTypeConverter.convertToString(deviceId.type),
              code: deviceId.code
            }
          })
          .orFail()
        break
      case DeviceType.SENSOR:
        await this.sensorModel
          .deleteOne({
            _id: {
              type: DeviceTypeConverter.convertToString(deviceId.type),
              code: deviceId.code
            }
          })
          .orFail()
        break
      default:
        throw new Error('Error while deleting device')
    }
  }
}
