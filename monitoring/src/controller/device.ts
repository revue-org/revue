import { Model, model } from 'mongoose'
import { cameraSchema } from '@storage/device/schemas/CameraSchema.js'
import { sensorSchema } from '@storage/device/schemas/SensorSchema.js'
import { Device } from '@domain/device/core/Device'
import { Camera } from '@domain/device/core/Camera.js'
import { Sensor } from '@domain/device/core/Sensor.js'
import { DeviceId } from '@domain/device/core/DeviceId.js'
import { DeviceRepository } from '@domain/device/repositories/DeviceRepository.js'
import { DeviceRepositoryImpl } from '@storage/device/DeviceRepositoryImpl.js'
import { DeviceFactory } from '@domain/device/factories/DeviceFactory.js'
import { DeviceFactoryImpl } from '@domain/device/factories/impl/DeviceFactoryImpl.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { DeviceTypeConverter } from '@utils/DeviceTypeConverter.js'
import { Resolution } from '@domain/device/core/Resolution.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { DeviceType } from 'domain/dist/domain/device/core'

export const cameraModel: Model<Camera> = model<Camera>('Camera', cameraSchema, 'device')
export const sensorModel: Model<Sensor> = model<Sensor>('Sensor', sensorSchema, 'device')
const deviceManager: DeviceRepository = new DeviceRepositoryImpl(cameraModel, sensorModel)
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

export const deviceController = {
  getDeviceById: async (type: DeviceType, code: string): Promise<Device> => {
    return await deviceManager.getDeviceById(deviceIdFactory.createId(type, code))
  },
  getCameraByCode: async (code: string): Promise<Camera> => {
    return await deviceManager.getCameraByCode(code)
  },
  getSensorByCode: async (code: string): Promise<Sensor> => {
    return await deviceManager.getSensorByCode(code)
  },
  getCameras: async (): Promise<Camera[]> => {
    return await deviceManager.getCameras()
  },
  getSensors: async (): Promise<Sensor[]> => {
    return await deviceManager.getSensors()
  },
  createCamera: async (
    deviceId: DeviceId,
    ipAddress: string,
    resolution: Resolution
  ): Promise<void> => {
    if ((await deviceManager.getDeviceById(deviceId)) !== null) {
      throw new Error('Camera already present' + deviceId.code + ' ' + deviceId.type.toString())
    }
    return await deviceManager.insertCamera(
      deviceFactory.createCamera(deviceId, ipAddress, resolution)
    )
  },
  createSensor: async (
    deviceId: DeviceId,
    ipAddress: string,
    intervalMillis: number,
    measures: Measure[]
  ): Promise<void> => {
    if ((await deviceManager.getDeviceById(deviceId)) !== null) {
      throw new Error('Sensor already present')
    }
    return await deviceManager.insertSensor(
      deviceFactory.createSensor(deviceId, ipAddress, intervalMillis, measures)
    )
  },
  updateCamera: async (
    deviceId: DeviceId,
    ipAddress: string,
    resolution: Resolution
  ): Promise<void> => {
    return await deviceManager.updateCamera(
      deviceFactory.createCamera(deviceId, ipAddress, resolution)
    )
  },
  updateSensor: async (
    deviceId: DeviceId,
    ipAddress: string,
    intervalMillis: number,
    measures: Measure[]
  ): Promise<void> => {
    return await deviceManager.updateSensor(
      deviceFactory.createSensor(deviceId, ipAddress, intervalMillis, measures)
    )
  },
  deleteDevice: async (type: string, code: string): Promise<void> => {
    return await deviceManager.deleteDevice(
      deviceIdFactory.createId(DeviceTypeConverter.convertToDeviceType(type), code)
    )
  }
}
