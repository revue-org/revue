import { DeviceId } from '../core/DeviceId.js'
import { EnvironmentData } from '../core/EnvironmentData.js'

export interface EnvironmentDataRepository {
  getEnvironmentData(): Promise<EnvironmentData[]>

  getDataByDeviceId(deviceId: DeviceId): Promise<EnvironmentData[]>

  insertEnvironmentData(environmentData: EnvironmentData): Promise<void>

  updateEnvironmentData(environmentData: EnvironmentData): Promise<void>

  deleteEnvironmentData(id: string): Promise<void>
}
