import type { Request, Response } from 'express'
import { Model, model } from 'mongoose'
import { cameraSchema } from 'domain/dist/storage/device/schemas/CameraSchema'
import { sensorSchema } from 'domain/dist/storage/device/schemas/SensorSchema'
import { DeviceId } from 'domain/dist/domain/device/core/DeviceId'
import { DeviceIdImpl } from 'domain/dist/domain/device/core/impl/DeviceIdImpl'
import { ResolutionImpl } from 'domain/dist/domain/device/core/impl/ResolutionImpl'
import { Measure } from 'domain/dist/domain/device/core/impl/enum/Measure'
import { DeviceRepositoryImpl } from 'domain/dist/storage/device/DeviceRepositoryImpl'
import { DeviceFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceFactoryImpl'
import { DeviceType } from 'domain/dist/domain/device/core/impl/enum/DeviceType'
import { DeviceTypeConverter } from 'domain/dist/utils/DeviceTypeConverter'
import { Sensor } from "domain/dist/domain/device/core/Sensor";
import { Camera } from "domain/dist/domain/device/core/Camera";

const cameraModel: Model<Camera> = model<Camera>('Camera', cameraSchema, 'device')
const sensorModel: Model<Sensor> = model<Sensor>('Sensor', sensorSchema, 'device')
const deviceManager: DeviceRepositoryImpl = new DeviceRepositoryImpl(cameraModel, sensorModel)
const deviceFactory: DeviceFactoryImpl = new DeviceFactoryImpl()

export const deviceController = {
  getCameras: async (req: Request, res: Response) => {
    res.json(await deviceManager.getCameras())
  },
  getSensors: async (req: Request, res: Response) => {
    res.json(await deviceManager.getSensors())
  },
  getDevice: async (req: Request, res: Response) => {
    const deviceId: DeviceId = new DeviceIdImpl(req.body.id, req.body.type)
    res.json(await deviceManager.getDevice(deviceId))
  },
  createDevice: async (req: Request, res: Response) => {
    let deviceId: DeviceId = new DeviceIdImpl(
      DeviceTypeConverter.convertToDeviceType(req.body.type),
      req.body.code
    )
    if ((await deviceManager.getDevice(deviceId)) !== null) {
      throw new Error('Device already present')
    }

    switch (deviceId.type) {
      case DeviceType.CAMERA:
        const resolution = new ResolutionImpl(req.body.resolutionHeight, req.body.resolutionWidth)
        res.json(await deviceManager.insertDevice(
          deviceFactory.createCamera(deviceId, req.body.ipAddress, resolution)
        ))
        break
      case DeviceType.SENSOR:
        const measures: Set<Measure> = req.body.measures
        res.json(await deviceManager.insertDevice(
          deviceFactory.createSensor(
            deviceId,
            req.body.ipAddress,
            req.body.intervalMillis,
            measures
          )
        ))
        break
      default:
        throw new Error('Error while creating device')
    }
  },
  updateDevice: async (req: Request, res: Response) => {}
}
