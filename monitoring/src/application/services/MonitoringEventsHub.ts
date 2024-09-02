import { Measurement } from '@common/domain/core/Measurement'
import { DeviceEvent } from 'common/dist/domain/core'

export interface MonitoringEventsHub {
  listenToMeasurements(handler: (measurement: Measurement) => void): void

  listenToDeviceEvents(handler: (device: DeviceEvent) => void): void

  registerDevices(deviceIds: string[]): void

  unregisterDevices(deviceIds: string[]): void

  publishMeasurement(measurement: Measurement): void
}
