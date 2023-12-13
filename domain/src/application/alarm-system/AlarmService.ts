import { Anomaly } from '../../domain/anomaly/core/Anomaly.js'
import { DeviceId } from '../../domain/device/core/DeviceId.js'

export interface AlarmService {
  startRecognizing(deviceId: DeviceId): void

  stopRecognizing(deviceId: DeviceId): void

  sendNotification(anomaly: Anomaly): void
}
