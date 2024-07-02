export interface Device {
  readonly deviceId: string
  readonly description: string
  readonly endpoint: {
    readonly ipAddress: string
    readonly port: number
  }
  readonly isEnabled: boolean
  readonly locationId: string
}
