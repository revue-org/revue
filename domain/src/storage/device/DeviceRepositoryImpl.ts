import { DeviceRepository } from '../../domain/device/repositories/DeviceRepository.js'
import { Model } from 'mongoose'
import { DeviceId } from '../../domain/device/core/DeviceId.js'
import { DeviceType } from '../../domain/device/core/impl/enum/DeviceType.js'
import { Camera } from '../../domain/device/core/Camera.js'
import { Sensor } from '../../domain/device/core/Sensor.js'
import { DeviceTypeConverter } from '../../utils/DeviceTypeConverter.js'
import { Device } from '../../domain/device/core'

export class DeviceRepositoryImpl implements DeviceRepository {
  cameraModel: Model<Camera>
  sensorModel: Model<Sensor>

  constructor(cameraModel: Model<Camera>, sensorModel: Model<Sensor>) {
    this.cameraModel = cameraModel
    this.sensorModel = sensorModel
  }

  async getDevices(): Promise<Device[]> {
    const cameras: Camera[] = await this.getCameras()
    const sensors: Sensor[] = await this.getSensors()
    return [...cameras, ...sensors]
  }

  async getCapturingDevices(): Promise<Device[]> {
    const devices: Device[] = await this.getDevices()
    return devices.filter((device: Device) => device.isCapturing)
  }

  async getCameras(): Promise<Camera[]> {
    return this.cameraModel
      .find({
        '_id.type': 'CAMERA'
      })
      .orFail()
  }

  async getSensors(): Promise<Sensor[]> {
    return this.sensorModel
      .find({
        '_id.type': 'SENSOR'
      })
      .orFail()
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

  async getCameraByCode(code: string): Promise<Camera> {
    return this.cameraModel.findOne({
      _id: {
        type: DeviceTypeConverter.convertToString(DeviceType.CAMERA),
        code: code
      }
    }) as unknown as Camera
  }

  async getSensorByCode(code: string): Promise<Sensor> {
    return this.sensorModel.findOne({
      _id: {
        type: DeviceTypeConverter.convertToString(DeviceType.SENSOR),
        code: code
      }
    }) as unknown as Sensor
  }

  async insertCamera(camera: Camera): Promise<void> {
    await this.cameraModel
      .create({
        _id: {
          type: DeviceTypeConverter.convertToString(camera.deviceId.type),
          code: camera.deviceId.code
        },
        isCapturing: camera.isCapturing,
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
        isCapturing: sensor.isCapturing,
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
          isCapturing: camera.isCapturing,
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
          isCapturing: sensor.isCapturing,
          ipAddress: sensor.ipAddress,
          intervalMillis: sensor.intervalMillis,
          measures: sensor.measures
        }
      )
      .orFail()
  }

  async deleteCamera(code: string): Promise<void> {
    await this.cameraModel
      .deleteOne({
        _id: {
          type: 'CAMERA',
          code: code
        }
      })
      .orFail()
  }

  async deleteSensor(code: string): Promise<void> {
    await this.sensorModel
      .deleteOne({
        _id: {
          type: 'SENSOR',
          code: code
        }
      })
      .orFail()
  }
}
