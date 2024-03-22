import { LogService } from '../LogService.js'
import { EnvironmentDataRepository } from '../../../domain/device/repositories/EnvironmentDataRepository.js'
import { DeviceId } from '../../../domain/device/core/DeviceId.js'
import { EnvironmentData } from '../../../domain/device/core/EnvironmentData.js'

export class LogServiceImpl implements LogService {
  private environmentDataRepository: EnvironmentDataRepository

  constructor(environmentDataRepository: EnvironmentDataRepository) {
    this.environmentDataRepository = environmentDataRepository
  }

  deleteEnvironmentData(id: string): void {
    this.environmentDataRepository.deleteEnvironmentData(id)
  }

  getDataByDeviceId(deviceId: DeviceId): Promise<EnvironmentData[]> {
    return this.environmentDataRepository.getDataByDeviceId(deviceId)
  }

  getEnvironmentData(): Promise<EnvironmentData[]> {
    return this.environmentDataRepository.getEnvironmentData()
  }

  insertEnvironmentData(environmentData: EnvironmentData): void {
    this.environmentDataRepository.insertEnvironmentData(environmentData)
  }

  updateEnvironmentData(environmentData: EnvironmentData): void {
    this.environmentDataRepository.updateEnvironmentData(environmentData)
  }
}
