import { Model } from 'mongoose'
import { DeviceId } from '../../domain/device/core/DeviceId.js'
import { DeviceTypeConverter } from '../../utils/DeviceTypeConverter.js'
import { EnvironmentData } from '../../domain/device/core'
import { EnvironmentDataRepository } from '../../domain/device/repositories/EnvironmentDataRepository'
import { MeasureConverter } from '../../utils'

export class EnvironmentDataRepositoryImpl implements EnvironmentDataRepository {
  environmentDataModel: Model<EnvironmentData>

  constructor(environmentDataModel: Model<EnvironmentData>) {
    this.environmentDataModel = environmentDataModel
  }

  async getEnvironmentData(): Promise<EnvironmentData[]> {
    return this.environmentDataModel.find().orFail()
  }

  async getDataByDeviceId(deviceId: DeviceId): Promise<EnvironmentData[]> {
    return this.environmentDataModel.find({
      deviceId: {
        type: DeviceTypeConverter.convertToString(deviceId.type),
        code: deviceId.code
      }
    }) as unknown as EnvironmentData[]
  }

  async insertEnvironmentData(environmentData: EnvironmentData): Promise<void> {
    await this.environmentDataModel
      .create({
        deviceId: {
          type: DeviceTypeConverter.convertToString(environmentData.sourceDeviceId.type),
          code: environmentData.sourceDeviceId.code
        },
        value: environmentData.value,
        measure: MeasureConverter.convertToString(environmentData.measure),
        timestamp: environmentData.timestamp
      })
      .catch((err): void => {
        throw err
      })
  }

  async updateEnvironmentData(environmentData: EnvironmentData): Promise<void> {
    await this.environmentDataModel
      .findByIdAndUpdate(environmentData.id, {
        deviceId: { type: environmentData.sourceDeviceId.type, code: environmentData.sourceDeviceId.code },
        value: environmentData.value,
        measure: MeasureConverter.convertToString(environmentData.measure),
        timestamp: environmentData.timestamp
      })
      .orFail()
  }

  async deleteEnvironmentData(id: string): Promise<void> {
    await this.environmentDataModel.findByIdAndDelete(id).orFail()
  }
}
