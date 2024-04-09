import { DeviceId } from '../core/DeviceId.js'
import { EnvironmentData } from '../core/EnvironmentData.js'

export interface EnvironmentDataRepository {
  getEnvironmentData(): Promise<EnvironmentData[]>

  getDataBySensorId(deviceId: DeviceId): Promise<EnvironmentData[]>

  getLatestDataBySensorId(deviceId: DeviceId, quantity: number): Promise<EnvironmentData[]>

  insertEnvironmentData(environmentData: EnvironmentData): Promise<void>

  updateEnvironmentData(environmentData: EnvironmentData): Promise<void>

  deleteEnvironmentData(id: string): Promise<void>

}
