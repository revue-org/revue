import { Anomaly } from './Anomaly.js'
import { Measurement } from './Measurement'

export interface Outlier extends Anomaly {
  readonly type: 'outlier'

  readonly measurement: Measurement

  readonly rangeRuleId: string
}
