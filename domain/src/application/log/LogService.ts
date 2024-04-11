import { DeviceId } from '../../domain/device/core/DeviceId.js'
import { EnvironmentData } from '../../domain/device/core/EnvironmentData.js'

export interface LogService {
  getEnvironmentData(): Promise<EnvironmentData[]>

  getDataBySensorId(deviceId: DeviceId): Promise<EnvironmentData[]>

  getLatestDataBySensorId(deviceId: DeviceId, quantity: number): Promise<EnvironmentData[]>

  insertEnvironmentData(environmentData: EnvironmentData): void

  updateEnvironmentData(environmentData: EnvironmentData): void

  deleteEnvironmentData(id: string): void
}
