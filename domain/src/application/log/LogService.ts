import { DeviceId } from '../../domain/device/core/DeviceId.js'
import { EnvironmentData } from '../../domain/device/core/EnvironmentData.js'

export interface LogService {
  getEnvironmentData(): Promise<EnvironmentData[]>

  getDataByDeviceId(deviceId: DeviceId): Promise<EnvironmentData[]>

  insertEnvironmentData(environmentData: EnvironmentData): void

  updateEnvironmentData(environmentData: EnvironmentData): void

  deleteEnvironmentData(id: string): void
}
