import { Anomaly } from './Anomaly.js'

export interface Outlier extends Anomaly {
  type: 'outlier'

  measurementId: MeasurementId

}
