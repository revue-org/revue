import { DeviceRepository } from '../../domain/device/repositories/DeviceRepository'
import { Model } from 'mongoose'
import { CameraImpl } from '../../domain/device/core/impl/CameraImpl'
import { SensorImpl } from "../../domain/device/core/impl/SensorImpl";
import { DeviceId } from "../../domain/device/core/DeviceId";
import { DeviceType } from "../../domain/device/core/impl/enum/DeviceType";
import { Device } from "../../domain/device/core/Device";

export class DeviceRepositoryImpl implements DeviceRepository {
  cameraModel: Model<CameraImpl>
  sensorModel: Model<SensorImpl>

  constructor(cameraModel: Model<CameraImpl>, sensorModel: Model<SensorImpl>) {
    this.cameraModel = cameraModel
    this.sensorModel = sensorModel
  }

  getCameras(): Promise<Array<CameraImpl>> {
    return this.cameraModel.find()
  }

  getSensors(): Promise<Array<SensorImpl>> {
    return this.sensorModel.find()
  }

  async getDevice(deviceId: DeviceId): Promise<CameraImpl | SensorImpl> {
    switch (deviceId.type) {
      case DeviceType.CAMERA:
        return await this.cameraModel.findOne(deviceId) as unknown as CameraImpl
      case DeviceType.SENSOR:
        return await this.sensorModel.findById(deviceId) as unknown as SensorImpl
    }
  }

  async insertDevice(device: Device): Promise<void> {
    switch (device.deviceId.type) {
      case DeviceType.CAMERA:
        console.log(device)
        //await this.cameraModel.insertMany(device)
        console.log(new this.cameraModel(device))

        //this.cameraModel.in
        await new this.cameraModel(device).save()
        break
      case DeviceType.SENSOR:
        await new this.sensorModel(device).save()
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
