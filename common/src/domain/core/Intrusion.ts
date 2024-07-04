import { Anomaly } from './Anomaly.js'
import { Detection } from './Detection'

export interface Intrusion extends Anomaly {
  readonly type: 'intrusion'

  readonly detection: Detection

  readonly intrusionRuleId: string
}
