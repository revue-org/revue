import type { Request } from 'express'
import { Model, model } from 'mongoose'
import { cameraSchema } from '@storage/device/schemas/CameraSchema.js'
import { sensorSchema } from '@storage/device/schemas/SensorSchema.js'
import { Device } from "@domain/device/core/Device";
import { Camera } from '@domain/device/core/Camera.js'
import { Sensor } from '@domain/device/core/Sensor.js'
import { DeviceId } from '@domain/device/core/DeviceId.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { DeviceType } from '@domain/device/core/impl/enum/DeviceType.js'
import { DeviceRepository } from '@domain/device/repositories/DeviceRepository.js'
import { DeviceRepositoryImpl } from '@storage/device/DeviceRepositoryImpl.js'
import { DeviceFactory } from '@domain/device/factories/DeviceFactory.js'
import { DeviceFactoryImpl } from '@domain/device/factories/impl/DeviceFactoryImpl.js'
import { DeviceIdFactory } from '@domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { ResolutionFactory } from '@domain/device/factories/ResolutionFactory.js'
import { ResolutionFactoryImpl } from '@domain/device/factories/impl/ResolutionFactoryImpl.js'
import { DeviceTypeConverter } from 'domain/dist/utils/DeviceTypeConverter.js'
import { Resolution } from "domain/dist/domain/device/core/Resolution.js";

const cameraModel: Model<Camera> = model<Camera>('Camera', cameraSchema, 'device')
const sensorModel: Model<Sensor> = model<Sensor>('Sensor', sensorSchema, 'device')
const deviceManager: DeviceRepository = new DeviceRepositoryImpl(cameraModel, sensorModel)
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()

export const deviceController = {
  getDeviceById: async (req: Request): Promise<Device> => {
    return await deviceManager.getDeviceById(
      deviceIdFactory.createId(
        DeviceTypeConverter.convertToDeviceType(req.params.type),
        req.params.code
      )
    )
  },
  getCameras: async (): Promise<Camera[]> => {
    return await deviceManager.getCameras()
  },
  getSensors: async (): Promise<Sensor[]> => {
    return await deviceManager.getSensors()
  },
  createDevice: async (req: Request): Promise<void> => {
    let deviceId: DeviceId = deviceIdFactory.createId(
      DeviceTypeConverter.convertToDeviceType(req.body.type),
      req.body.code
    )
    if ((await deviceManager.getDeviceById(deviceId)) !== null) {
      throw new Error('Device already present')
    }

    switch (deviceId.type) {
      case DeviceType.CAMERA:
        const resolution: Resolution = resolutionFactory.createResolution(
          req.body.resolutionHeight,
          req.body.resolutionWidth
        )
        return await deviceManager.insertDevice(
          deviceFactory.createCamera(deviceId, req.body.ipAddress, resolution)
        )
      case DeviceType.SENSOR:
        const measures: Set<Measure> = req.body.measures
        return await deviceManager.insertDevice(
          deviceFactory.createSensor(
            deviceId,
            req.body.ipAddress,
            req.body.intervalMillis,
            measures
          )
        )
      default:
        throw new Error('Error while creating device')
    }
  },
  updateDevice: async (req: Request): Promise<void> => {
    let deviceId: DeviceId = deviceIdFactory.createId(
      DeviceTypeConverter.convertToDeviceType(req.body.type),
      req.body.code
    )
    switch (deviceId.type) {
      case DeviceType.CAMERA:
        const resolution: Resolution = resolutionFactory.createResolution(
          req.body.resolutionHeight,
          req.body.resolutionWidth
        )
        return await deviceManager.updateDevice(
          deviceFactory.createCamera(deviceId, req.body.ipAddress, resolution)
        );
      case DeviceType.SENSOR:
        const measures: Set<Measure> = req.body.measures
        return await deviceManager.updateDevice(
          deviceFactory.createSensor(
            deviceId,
            req.body.ipAddress,
            req.body.intervalMillis,
            measures
          )
        )
      default:
        throw new Error('Error while updating device')
    }
  },
  deleteDevice: async (req: Request): Promise<void> => {
    return await deviceManager.deleteDevice(req.body.id)
  }
}
