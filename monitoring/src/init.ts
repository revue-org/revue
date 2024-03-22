import { model, Model } from 'mongoose'
import { Camera } from "domain/dist/domain/device/core/Camera.js";
import { Sensor } from "domain/dist/domain/device/core/Sensor.js";
import { cameraSchema } from "domain/dist/storage/device/schemas/CameraSchema.js";
import { sensorSchema } from "domain/dist/storage/device/schemas/SensorSchema.js";
import { DeviceRepository } from "domain/dist/domain/device/repositories/DeviceRepository.js";
import { DeviceRepositoryImpl } from "domain/dist/storage/device/DeviceRepositoryImpl.js";
import { DeviceService } from "domain/dist/application/device/DeviceService.js";
import { DeviceServiceImpl } from "domain/dist/application/device/impl/DeviceServiceImpl.js";

export const cameraModel: Model<Camera> = model<Camera>('Camera', cameraSchema, 'device')
export const sensorModel: Model<Sensor> = model<Sensor>('Sensor', sensorSchema, 'device')
const deviceRepository: DeviceRepository = new DeviceRepositoryImpl(cameraModel, sensorModel)

export const deviceService: DeviceService = new DeviceServiceImpl(deviceRepository)
