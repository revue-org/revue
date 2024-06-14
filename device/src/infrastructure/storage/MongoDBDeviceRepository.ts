import mongoose from 'mongoose'
import { DeviceDBAdapter, DeviceDBEntity } from './models/DeviceModel'
import { deviceSchema } from './schemas/DeviceSchema'
import { DeviceRepository } from '@/application/repositories/DeviceRepository'
import { Device } from '@/domain/core/Device'
import { DeviceId } from '@/domain/core/DeviceId'

export class MongoDBDeviceRepository implements DeviceRepository {
  private _model = mongoose.model<DeviceDBEntity>('Device', deviceSchema)

  getDeviceById(deviceId: DeviceId): Promise<Device> {
    return this._model
      .findOne({ deviceId: deviceId.value })
      .lean()
      .then(device => DeviceDBAdapter.toDomainEntity(device as DeviceDBEntity))
  }

  getDevices(): Promise<Device[]> {
    return this._model
      .find()
      .lean()
      .then(devices => devices.map(device => DeviceDBAdapter.toDomainEntity(device)))
  }

  getDevice(deviceId: DeviceId): Promise<Device> {
    return this._model
      .findOne({ deviceId: deviceId.value })
      .lean()
      .then(device => DeviceDBAdapter.toDomainEntity(device as DeviceDBEntity))
  }

  async saveDevice(device: Device): Promise<void> {
    await this._model.create(DeviceDBAdapter.toDBEntity(device))
  }

  async updateDevice(device: Device): Promise<void> {
    await this._model.updateOne({ deviceId: device.deviceId.value }, DeviceDBAdapter.toDBEntity(device))
  }

  async deleteDevice(deviceId: DeviceId): Promise<void> {
    await this._model.deleteOne({ deviceId: deviceId.value })
  }
}
