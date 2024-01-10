import type { Request, Response } from 'express'
import { Model, model } from 'mongoose'
import { exceedingSchema } from 'domain/dist/storage/anomaly/schemas/exceedingSchema.js'

import { intrusionSchema } from 'domain/dist/storage/anomaly/schemas/intrusionSchema.js'
import { AnomalyRepositoryImpl } from 'domain/dist/storage/anomaly/AnomalyRepositoryImpl.js'
import { AnomalyFactoryImpl } from 'domain/dist/domain/anomaly/factories/impl/AnomalyFactoryImpl.js'
import { Exceeding } from 'domain/dist/domain/anomaly/core/Exceeding'
import { Intrusion } from 'domain/dist/domain/anomaly/core/Intrusion'
import { DeviceType } from "domain/dist/domain/device/core/impl/enum/DeviceType";
import { Measure } from "domain/dist/domain/device/core/impl/enum/Measure";

const exceedingModel: Model<Exceeding> = model<Exceeding>('Exceeding', exceedingSchema, 'anomaly')
const intrusionModel: Model<Intrusion> = model<Intrusion>('Intrusion', intrusionSchema, 'anomaly')

const anomalyManager: AnomalyRepositoryImpl = new AnomalyRepositoryImpl(exceedingModel, intrusionModel)
const anomalyFactory: AnomalyFactoryImpl = new AnomalyFactoryImpl()

export const anomalyController = {

  /*
  *   getCameras: async (): Promise<Camera[]> => {
    return await deviceManager.getCameras()
  },
  getSensors: async (): Promise<Sensor[]> => {
    return await deviceManager.getSensors()
  },
  getDevice: async (req: Request): Promise<Device> => {
    return await deviceManager.getDevice(
      deviceIdFactory.createId(
        DeviceTypeConverter.convertToDeviceType(req.body.type),
        req.body.code
      )
    )
  },
  createDevice: async (req: Request): Promise<void> => {
    let deviceId: DeviceId = deviceIdFactory.createId(
      DeviceTypeConverter.convertToDeviceType(req.body.type),
      req.body.code
    )
    if ((await deviceManager.getDevice(deviceId)) !== null) {
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
        throw new Error('Error while creating device')
    }
  }*/
  getCameras: async (): Promise<Camera[]> => {
    return await deviceManager.getCameras()
  },

  getExceedings: async (req: Request, res: Response) => {
    res.json(await anomalyManager.getExceedings())
  },
  getIntrusions: async (req: Request, res: Response) => {
    res.json(await anomalyManager.getIntrusions())
  },
  getAnomaly: async (req: Request, res: Response) => {
    const anomalyId: string = req.body.id;
    res.json(await anomalyManager.getAnomaly(anomalyId))
  },
  createAnomaly: async (req: Request, res: Response) => {
    let anomalyId: string = req.body.id;
    if ((await anomalyManager.getAnomaly(anomalyId)) !== null) {
      throw new Error('Anomaly already present')
    }

    /*switch (deviceId.type) {
      case DeviceType.CAMERA:
        const resolution = new ResolutionImpl(req.body.resolutionHeight, req.body.resolutionWidth)
        res.json(
          await deviceManager.insertDevice(
            deviceFactory.createCamera(deviceId, req.body.ipAddress, resolution)
          )
        )
        break
      case DeviceType.SENSOR:
        const measures: Set<Measure> = req.body.measures
        res.json(
          await deviceManager.insertDevice(
            deviceFactory.createSensor(
              deviceId,
              req.body.ipAddress,
              req.body.intervalMillis,
              measures
            )
          )
        )
        break
      default:
        throw new Error('Error while creating device')
    }*/
  },
  updateAnomaly: async (req: Request, res: Response) => {
    res.json('ok')
  },
  deleteAnomaly: async (req: Request, res: Response) => {
    res.json('ok')
  }
}

/*

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
        res.json(
          await deviceManager.insertDevice(
            deviceFactory.createCamera(deviceId, req.body.ipAddress, resolution)
          )
        )
        break
      case DeviceType.SENSOR:
        const measures: Set<Measure> = req.body.measures
        res.json(
          await deviceManager.insertDevice(
            deviceFactory.createSensor(
              deviceId,
              req.body.ipAddress,
              req.body.intervalMillis,
              measures
            )
          )
        )
        break
      default:
        throw new Error('Error while creating device')
    }
  },
  updateDevice: async (req: Request, res: Response) => {
    let deviceId: DeviceId = new DeviceIdImpl(
      DeviceTypeConverter.convertToDeviceType(req.body.type),
      req.body.code
    )
    switch (deviceId.type) {
      case DeviceType.CAMERA:
        const resolution = new ResolutionImpl(req.body.resolutionHeight, req.body.resolutionWidth)
        res.json(
          await deviceManager.updateDevice(
            deviceFactory.createCamera(deviceId, req.body.ipAddress, resolution)
          )
        )
        break
      case DeviceType.SENSOR:
        const measures: Set<Measure> = req.body.measures
        res.json(
          await deviceManager.updateDevice(
            deviceFactory.createSensor(
              deviceId,
              req.body.ipAddress,
              req.body.intervalMillis,
              measures
            )
          )
        )
        break
      default:
        throw new Error('Error while creating device')
    }
  }
}

* */
