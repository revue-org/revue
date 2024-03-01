import { Anomaly } from '../../domain/anomaly/core/Anomaly.js'

export interface AlarmService {
  sendNotification(anomaly: Anomaly): void
}
