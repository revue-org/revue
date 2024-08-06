import { DeviceCapability } from '@/domain/core/capabilities/DeviceCapability'

export interface DeviceState {
  id: string
  location: string
  enabled: boolean
  capabilities: DeviceCapability[]
}
