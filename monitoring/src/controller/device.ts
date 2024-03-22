import { Device } from '@domain/device/core/Device'
import { Camera } from '@domain/device/core/Camera.js'
import { Sensor } from '@domain/device/core/Sensor.js'
import { DeviceId } from '@domain/device/core/DeviceId.js'
import { DeviceFactory } from '@domain/device/factories/DeviceFactory.js'
import { DeviceFactoryImpl } from '@domain/device/factories/impl/DeviceFactoryImpl.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { Resolution } from '@domain/device/core/Resolution.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { DeviceType } from 'domain/dist/domain/device/core/impl/enum/DeviceType.js'
import { deviceService } from "../../src/init.js";

const deviceFactory: DeviceFactory = new DeviceFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

export const deviceController = {
  getDevices: async (): Promise<Device[]> => {
    return await deviceService.getDevices()
  },
  getCapturingDevices: async (): Promise<Device[]> => {
    return await deviceService.getCapturingDevices()
  },
  getDeviceById: async (type: DeviceType, code: string): Promise<Device> => {
    return await deviceService.getDeviceById(deviceIdFactory.createId(type, code))
  },
  getCameraByCode: async (code: string): Promise<Camera> => {
    return await deviceService.getCameraByCode(code)
  },
  getSensorByCode: async (code: string): Promise<Sensor> => {
    return await deviceService.getSensorByCode(code)
  },
  getCameras: async (): Promise<Camera[]> => {
    return await deviceService.getCameras()
  },
  getSensors: async (): Promise<Sensor[]> => {
    return await deviceService.getSensors()
  },
  createCamera: async (deviceId: DeviceId, ipAddress: string, resolution: Resolution): Promise<void> => {
    if ((await deviceService.getDeviceById(deviceId)) !== null) {
      throw new Error('Camera already present' + deviceId.code + ' ' + deviceId.type.toString())
    }
    return deviceService.insertCamera(
      deviceFactory.createCamera(deviceId, false, ipAddress, resolution)
    )
  },
  createSensor: async (
    deviceId: DeviceId,
    ipAddress: string,
    intervalMillis: number,
    measures: Measure[]
  ): Promise<void> => {
    if ((await deviceService.getDeviceById(deviceId)) !== null) {
      throw new Error('Sensor already present')
    }
    return deviceService.insertSensor(
      deviceFactory.createSensor(deviceId, false, ipAddress, intervalMillis, measures)
    )
  },
  updateCamera: async (
    deviceId: DeviceId,
    isCapturing: boolean,
    ipAddress: string,
    resolution: Resolution
  ): Promise<void> => {
    return deviceService.updateCamera(
      deviceFactory.createCamera(deviceId, isCapturing, ipAddress, resolution)
    )
  },
  updateSensor: async (
    deviceId: DeviceId,
    isCapturing: boolean,
    ipAddress: string,
    intervalMillis: number,
    measures: Measure[]
  ): Promise<void> => {
    return deviceService.updateSensor(
      deviceFactory.createSensor(deviceId, isCapturing, ipAddress, intervalMillis, measures)
    )
  },
  deleteCamera: async (code: string): Promise<void> => {
    return deviceService.deleteCamera(code)
  },
  deleteSensor: async (code: string): Promise<void> => {
    return deviceService.deleteSensor(code)
  }
}
