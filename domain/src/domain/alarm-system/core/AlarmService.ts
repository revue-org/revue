import { Anomaly } from '../../anomaly/core/Anomaly'
import { DeviceId } from '../../device/core/DeviceId'

export interface AlarmService {
  startRecognizing(deviceId: DeviceId): void

  stopRecognizing(deviceId: DeviceId): void

  sendNotification(anomaly: Anomaly): void
}
