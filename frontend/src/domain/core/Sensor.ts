export interface Sensor {
  readonly deviceId: string
  readonly description: string
  readonly endpoint: string
  readonly isEnabled: boolean
  readonly locationId: string
}