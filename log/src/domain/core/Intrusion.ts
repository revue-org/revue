import { Anomaly } from './Anomaly.js'

export interface Intrusion extends Anomaly {
  type : 'intrusion'

  detectionId : DetectionId
}
