import mongoose from 'mongoose'
import { DeviceDBAdapter, DeviceDBEntity } from './models/DeviceModel.js'
import { deviceSchema } from './schemas/DeviceSchema.js'
import { DeviceRepository } from '@/application/repositories/DeviceRepository.js'
import { Device } from '@/domain/core/Device.js'
import { DeviceId } from '@/domain/core/DeviceId.js'

export class MongoDBDeviceRepository implements DeviceRepository {
  private model = mongoose.model<DeviceDBEntity>('Device', deviceSchema, 'device')

  getDeviceById(deviceId: DeviceId): Promise<Device> {
    return this.model
      .findOne({ id: deviceId.value })
      .lean()
      .then(device => {
        console.log(device)
        return DeviceDBAdapter.toDomainEntity(device as DeviceDBEntity)
      })
  }

  getDevices(): Promise<Device[]> {
    return this.model
      .find()
      .lean()
      .then(devices => devices.map(device => DeviceDBAdapter.toDomainEntity(device)))
  }

  getDevice(deviceId: DeviceId): Promise<Device> {
    return this.model
      .findOne({ id: deviceId.value })
      .lean()
      .then(device => DeviceDBAdapter.toDomainEntity(device as DeviceDBEntity))
  }

  async saveDevice(device: Device): Promise<void> {
    await this.model.create(DeviceDBAdapter.toDBEntity(device))
  }

  async updateDevice(device: Device): Promise<void> {
    await this.model.updateOne({ id: device.deviceId.value }, DeviceDBAdapter.toDBEntity(device))
  }

  async removeDevice(deviceId: DeviceId): Promise<void> {
    await this.model.deleteOne({ id: deviceId.value })
  }

  async getActiveDevices(): Promise<Device[]> {
    return this.model
      .find({ isEnabled: true })
      .lean()
      .then(devices => devices.map(device => DeviceDBAdapter.toDomainEntity(device)))
  }
}
