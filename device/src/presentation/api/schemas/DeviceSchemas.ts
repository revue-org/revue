export type DeviceInsertion = {
  description: string
  endpoint: {
    ipAddress: string
    port: number
  }
  locationId: string
}

export type DeviceUpdate = {
  description: string
  endpoint: {
    ipAddress: string
    port: number
  }
  locationId: string
  isEnabled: boolean
}
