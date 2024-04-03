import { Model } from 'mongoose'
import { DeviceId } from '../../domain/device/core/DeviceId.js'
import { DeviceTypeConverter } from '../../utils/DeviceTypeConverter.js'
import { EnvironmentData } from '../../domain/device/core/EnvironmentData.js'
import { EnvironmentDataRepository } from '../../domain/device/repositories/EnvironmentDataRepository.js'
import { MeasureConverter } from '../../utils/MeasureConverter.js'
import { MeasureUnitConverter } from '../../utils/MeasureUnitConverter.js'

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
        measureUnit: MeasureUnitConverter.convertToString(environmentData.measureUnit),
        timestamp: environmentData.timestamp
      })
      .catch((err): void => {
        throw err
      })
  }

  async updateEnvironmentData(environmentData: EnvironmentData): Promise<void> {
    await this.environmentDataModel
      .findOneAndUpdate({
        deviceId: {
          type: DeviceTypeConverter.convertToString(environmentData.sourceDeviceId.type),
          code: environmentData.sourceDeviceId.code
        },
        timestamp: environmentData.timestamp
      }, {
        deviceId: { type: environmentData.sourceDeviceId.type, code: environmentData.sourceDeviceId.code },
        value: environmentData.value,
        measure: MeasureConverter.convertToString(environmentData.measure),
        measureUnit: MeasureUnitConverter.convertToString(environmentData.measureUnit),
        timestamp: environmentData.timestamp
      })
      .orFail()
  }

  async deleteEnvironmentData(id: string): Promise<void> {
    await this.environmentDataModel.findByIdAndDelete(id).orFail()
  }
}
